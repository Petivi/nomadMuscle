const Transaction = require('./../models/transaction');
const Locataire = require('./../models/locataire');
const Bailleur = require('./../models/bailleur');
const Salle = require('./../models/salle');
const fonctions = require('../utils/fonction');
const { authenticate } = require('./../middleware/authenticate');

module.exports = (app) => {

    app.get('/transactions', authenticate, (req, res) => {
        if (req.body.type == "locataire") {
            Transaction.find({ idLocataire: req.body.user_id })
                .then(transactions => {
                    res.send({ response: transactions });
                }).catch(err => res.status(500).send({ error: err }));
        } else if (req.body.type == "bailleur") {
            Salle.find({ idBailleur: req.body.user_id })
                .then(salles => {
                    let ttPromise = [];
                    salles.forEach((s) => {
                        ttPromise.push(Transaction.find({ idSalle: s._id }, { "__v": 0 }));
                    });
                    Promise.all(ttPromise).then(result => {
                        res.send({ response: result[0] });
                    });
                }).catch(err => res.status(500).send({ error: err }));

        } else {
            res.send({ error: "ERR_TYPE_INVALID" });
        }
    });

    app.get('/transactions/:id', (req, res) => {
        Transaction.find({ _id: req.params.id })
            .then(transaction => {
                res.send({ response: transaction });
            }).catch(err => res.status(500).send({ error: err }));
    });

    app.post('/transactions', authenticate, (req, res) => {
        if (req.body.type == "locataire") {
            let ttTransactionEmpietantes, salle;
            let transaction = new Transaction(req.body.data);
            transaction.idLocataire = req.body.user_id;
            Transaction.find({ date: new Date(transaction.date), idSalle: transaction.idSalle }).then(transactions => {// on récupere les transactions du même jour dans la même salle
                ttTransactionEmpietantes = transactions.filter(t => transaction.fin > t.debut && transaction.debut < t.fin); // transactions qui empietent sur les horaires choisi
                return Salle.find({ _id: transaction.idSalle })
            }).then(salles => {
                salle = new Salle(salles[0]);
                if (ttTransactionEmpietantes.length >= salle.utilisateurMax) { // si il y a deja le nombre max de personne dans la salle
                    res.status(200).send({ response: 'Cette salle est complète pour ce jour et ces horaires' });
                } else if (ttTransactionEmpietantes.find(t => t.idLocataire === transaction.idLocataire)) {
                    res.status(200).send({ response: 'Vous avez déjà loué cette salle pour ce jour et ces horaires' });
                } else {
                    return Locataire.find({ _id: transaction.idLocataire }).then(locataire => {
                        locataire = new Locataire(locataire[0]);
                        locataire.solde -= transaction.montant;
                        if (locataire.solde < 0) {
                            res.status(200).send({ response: 'le locataire n\'a pas assez d\'argent pour prendre cette salle' });
                        } else {
                            if (salle.validationAuto) {
                                transaction.confirmee = true;
                                fonctions.confirmationTransaction(transaction, salle, locataire).then(() => {
                                    res.status(201).send({ reponse: 'true' });
                                }).catch(err => res.status(500).send({ error: err }));
                            } else {
                                transaction.confirmee = false;
                                transaction.save().then(() => {
                                    res.status(201).send({ response: 'true' });
                                }).catch(err => res.status(500).send({ error: err }));
                            }
                        }
                    });
                }
            });
        } else {
            res.status(500).send({ error: 'ERR_TYPE_INVALID' });
        }
    });

    app.patch('/transactions/:id', authenticate, (req, res) => { //patch = remplacement partiel d'un element put remplacement global
        let locataire, bailleur, salle, valeurRemboursement, transaction;
        Transaction.find({ _id: req.params.id }).then(transactions => {
            transaction = transactions[0];
            if (transaction.annulee) {
                res.status(500).send({ response: 'Cette transaction a déjà été annulée vous ne pouvez plus vous faire rembourser' });
            } else {
                Salle.find({ _id: transaction.idSalle }).then(salles => {
                    salle = salles[0];
                    return Bailleur.find({ _id: salle.idBailleur })
                }).then(bailleurs => {
                    bailleur = bailleurs[0];
                    valeurRemboursement = transaction.montant * (salle.pourcentageRemboursement / 100);
                    return Locataire.find({ _id: transaction.idLocataire });
                }).then(locataires => {
                    locataire = locataires[0];
                    bailleur.solde -= valeurRemboursement;
                    bailleur = new Bailleur(bailleur);
                    locataire.solde += valeurRemboursement;
                    return bailleur.save();
                }).then(() => {
                    locataire = new Locataire(locataire);
                    return locataire.save();
                }).then(() => {
                    /* MAIL */
                    var heure_debut = fonctions.getCustomHour(transaction.debut);
                    var heure_fin = fonctions.getCustomHour(transaction.fin);
                    let bailleur_mail_subject = "Notification d'annulation de réservation";
                    let bailleur_mail_content = `La réservation du ` + transaction.date + ` de : ` + heure_debut + ` à ` + heure_fin + `<br>
                    Le locataire a été remboursé de `+ valeurRemboursement + ` €`;
                    let locataire_mail_subject = "Confirmation d'annulation de réservation";
                    let locataire_mail_content = `La réservation du ` + transaction.date + ` de : ` + heure_debut + ` à ` + heure_fin + `<br>
                    Votre solde a été recrédité de `+ valeurRemboursement + ` €`;
                    fonctions.sendCustomMail(bailleur.mail, bailleur.nom, bailleur.prenom, bailleur_mail_subject, bailleur_mail_content);
                    fonctions.sendCustomMail(locataire.mail, locataire.nom, locataire.prenom, locataire_mail_subject, locataire_mail_content);
                    /* FIN MAIL */
                    res.status(200).send({ response: 'true' });
                }).catch(err => res.status(500).send({ error: err }));
            }
        });
    });
}
