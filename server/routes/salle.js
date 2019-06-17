const Salle = require('./../models/salle');
const Bailleur = require('./../models/bailleur');
const Transaction = require('./../models/transaction');
const { authenticate } = require('./../middleware/authenticate');
const moment = require('moment');

module.exports = (app) => {

    app.get('/salles', authenticate, (req, res) => {
        var tabFinal = [];
        if (req.body.type == 'bailleur') {
            Bailleur.find({ _id: req.body.user_id }).then(bailleur => {
                Salle.find({ idBailleur: req.body.user_id }, { "__v": 0 }).then(salles => {
                    if (salles.length != 0) {
                        res.send({ response: { salles: salles, pieceIdValidated: bailleur[0].pieceValidated } });
                    } else {
                        res.send({ response: 'NO_ITEMS_FOUND' });
                    }
                });
            });
        } else if (req.body.type == 'locataire') {
            Salle.find({}, { "__v": 0 })
                .then(salles => {
                    if (salles.length != 0) {
                        let ttPromiseBailleur = [];
                        let ttPromiseTransaction = [];
                        salles.forEach((s) => {
                            if (s.disponibilite && s.disponibilite.exception && s.disponibilite.exception.length > 0) {
                                for (let i = 0; i < s.disponibilite.exception.length; i++) {
                                    s.disponibilite.exception[i] = moment(s.disponibilite.exception[i]).format('DD/MM/YYYY');
                                }
                            }
                            ttPromiseTransaction.push(Transaction.find({ idSalle: s._id, annulee: false }, { __v: 0 }));
                            ttPromiseBailleur.push(Bailleur.find({ _id: s.idBailleur, pieceValidated: true }, { password: 0, token: 0, __v: 0, pieceId: 0 }));
                        });
                        Promise.all(ttPromiseBailleur).then(result => {
                            for (let i = 0; i < salles.length; i++) {
                                let value = {
                                    salle: salles[i],
                                    bailleur: result[i][0]
                                }
                                tabFinal.push(value);
                            }
                            Promise.all(ttPromiseTransaction).then(ttTransaction => {
                                for (let i = 0; i < tabFinal.length; i++) {
                                    tabFinal[i].ttTransaction = ttTransaction.filter(t => t[0].idSalle == tabFinal[i].salle._id);
                                }
                                res.send({ response: { salles: tabFinal } });
                            });
                        });
                    } else {
                        res.send({ response: 'NO_ITEMS_FOUND' });
                    }
                });
        } else {
            res.send({ error: 'ERR_TYPE_INVALID' });
        }
    });

    app.get('/salles/:id', (req, res) => {
        Salle.find({ _id: req.params.id })
            .then(salles => {
                res.send({ response: salles });
            });
    });

    app.post('/salles', authenticate, (req, res) => {
        if (req.body.type == "bailleur") {
            req.body.data.idBailleur = req.body.user_id;
            var salle = new Salle(req.body.data);
            salle.save().then(result => {
                res.status(201).send({ response: 'created' });
            });
        } else {
            res.status(500).send({ error: 'ERR_TYPE_INVALID' });
        }
    });

}
