const Bailleur = require('./../models/bailleur');

module.exports = (app) => {

    app.get('/bailleurs', (req, res) => {
        Bailleur.find({})
            .then(bailleurs => {
                res.send({'reponse':bailleurs});
            });
    });

    app.get('/bailleurs/:id', (req, res) => {
        Bailleur.find({ _id: req.params.id })
            .then(bailleur => {
                res.send({'response':bailleur});
            });
    });

    app.post('/bailleurs', (req, res) => {
        let bailleur = new Bailleur(req.body.data);
        bailleur.save()
        .then(() => {
            res.status(201).send({'response':'true'});
        })
        .catch(err => {
            res.status(400).send({"response":"Ajout d'un bailleur impossible"});
        });
    });

}
