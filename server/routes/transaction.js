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
        var transaction = new Transaction(req.body);
        Transaction.find({ date: new Date(transaction.date), idSalle: transaction.idSalle }).then(transactions => {// on récupere les transactions du même jour dans la même salle
            let ttTransactionEmpietantes = transactions.filter(t => transaction.fin > t.debut && transaction.debut < t.fin);
            if (ttTransactionEmpietantes.length > 0) {
                res.status(500).send('Cette salle est déjà prise ce même jour à des horaires similaires');
            } else {
                return Locataire.find({ _id: transaction.idLocataire }).then(locataire => {
                    locataire = new Locataire(locataire[0]);
                    locataire.solde -= transaction.montant;
                    if (locataire.solde < 0) {
                        res.status(500).send('le locataire n\'a pas assez d\'argent pour prendre cette salle');
                    } else {
                        Salle.find({ _id: transaction.idSalle }).then(salle => {
                            salle = new Salle(salle[0]);
                            return Bailleur.find({ _id: salle.idBailleur })
                        }).then(bailleur => {
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
        Transaction.findOneAndUpdate(req.params.id, { annulee: true }).then(resTransaction => {
            transaction = resTransaction;
            return Salle.find({ _id: transaction.idSalle })
        }).then(salles => {
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
    });

}
