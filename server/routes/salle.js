const Salle = require('./../models/salle');

module.exports = (app) => {

    app.get('/salles', (req, res) => {
        Salle.find({})
            .then(salles => {
                res.send(salles);
            });
    });

    app.get('/salles/:id', (req, res) => {
        Salle.find({ _id: req.params.id })
            .then(salles => {
                console.log(salles.length);
                res.send(salles);
            });
    });

    app.post('/salles', (req, res) => {
        var salle = new Salle(req.body);
        salle.save().then(result => {
            res.sendStatus(201);
        });
    });

}
