const Bailleur = require('./../models/bailleur');

module.exports = (app) => {

    app.get('/bailleurs', (req, res) => {
        Bailleur.find({})
            .then(bailleurs => {
                res.send(bailleurs);
            });
    });

    app.get('/bailleurs/:id', (req, res) => {
        Bailleur.find({ _id: req.params.id })
            .then(bailleur => {
                res.send(bailleur);
            });
    });

    app.post('/bailleurs', (req, res) => {
        let bailleur = new Bailleur(req.body.data);
        bailleur.save()
        .then(() => {
            res.sendStatus(201);
        })
        .catch(err => {
            res.sendStatus(400).send("Ajout d'un bailleur impossible");
        });
    });

}
