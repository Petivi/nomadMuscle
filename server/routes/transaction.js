const Transaction = require('./../models/transaction');
const Locataire = require('./../models/locataire');
const Bailleur = require('./../models/bailleur');
const Salle = require('./../models/salle');

module.exports = (app) => {

    app.get('/transactions', (req, res) => {
        Transaction.find({})
            .then(transactions => {
                res.send(transactions);
            }).catch(err => res.status(500).send(err));
    });

    app.get('/transactions/:id', (req, res) => {
        Transaction.find({ _id: req.params.id })
            .then(transaction => {
                res.send(transaction);
            }).catch(err => res.status(500).send(err));
    });

    app.post('/transactions', (req, res) => {
        let ttTransactionEmpietantes;
        var transaction = new Transaction(req.body);
        Transaction.find({ date: new Date(transaction.date), idSalle: transaction.idSalle }).then(transactions => {// on récupere les transactions du même jour dans la même salle
            ttTransactionEmpietantes = transactions.filter(t => transaction.fin > t.debut && transaction.debut < t.fin); // transactions qui empietent sur les horaires choisi
            return Salle.find({ _id: transaction.idSalle })
        }).then(salles => {
            salle = new Salle(salles[0]);
            if (ttTransactionEmpietantes.length >= salle.utilisateurMax) { // si il y a deja le nombre max de personne dans la salle
                res.status(500).send('Cette salle est complète pour ce jour et ces horaires');
            } else if (ttTransactionEmpietantes.find(t => t.idLocataire === transaction.idLocataire)) {
                res.status(500).send('Vous avez déjà loué cette salle pour ce jour et ces horaires');
            } else {
                return Locataire.find({ _id: transaction.idLocataire }).then(locataire => {
                    locataire = new Locataire(locataire[0]);
                    locataire.solde -= transaction.montant;
                    if (locataire.solde < 0) {
                        res.status(500).send('le locataire n\'a pas assez d\'argent pour prendre cette salle');
                    } else {
                        Bailleur.find({ _id: salle.idBailleur }).then(bailleur => {
                            bailleur = new Bailleur(bailleur[0]);
                            bailleur.solde += transaction.montant;
                            return bailleur.save()
                        }).then(() => {
                            return locataire.save()
                        }).then(() => {
                            return transaction.save()
                        }).then(() => {
                            res.sendStatus(201);
                        })
                    }
                });
            }
        }).catch(err => res.status(500).send(err));
    });

    app.patch('/transactions/:id', (req, res) => { //patch = remplacement partiel d'un element put remplacement global
        let locataire, bailleur, salle, valeurRemboursement, transaction;
        Transaction.find({ _id: req.params.id }).then(transactions => {
            transaction = transactions[0];
            if (transaction.annulee) {
                res.status(500).send('Cette transaction a déjà été annulée vous ne pouvez plus vous faire rembourser');
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
                    res.sendStatus(200);
                }).catch(err => res.status(500).send(err));

            }
        });
    });

}
