const Salle = require('./../models/salle');
const Bailleur = require('./../models/bailleur');
const { authenticate } = require('./../middleware/authenticate');

module.exports = (app) => {

    app.get('/salles', authenticate, (req, res) => {
        var tabFinal = [];
        if (req.body.type == 'bailleur') {
            Salle.find({ idBailleur: req.body.user_id }, { "__v": 0 })
                .then(salles => {
                    if (salles.length != 0) {
                        res.send({ response: salles });
                    } else {
                        res.send({ response: 'NO_ITEMS_FOUND' });
                    }
                });
        } else if (req.body.type == 'locataire') {
            Salle.find({}, { "__v": 0 })
                .then(salles => {
                    if (salles.length != 0) {
                        let ttPromise = [];
                        salles.forEach((s) => {
                            ttPromise.push(Bailleur.find({ _id: s.idBailleur }, { "password": 0, "token": 0, "__v": 0, "pieceId": 0 }));
                            /* Bailleur.find({ _id: s.idBailleur }, { "password": 0, "token": 0, "__v": 0, "pieceId": 0 })
                                .then(b => {
                                    s.idBailleur = b;
                                    console.log(b);
                                    tabFinal.push(s)
                                }); */
                        });
                        Promise.all(ttPromise).then(result => {
                            result.forEach(tab => {
                                tabFinal.push(tab[0]);
                            });
                            res.send({ response: tabFinal });
                        })
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
