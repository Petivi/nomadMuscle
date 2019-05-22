const Salle = require('./../models/salle');
const { authenticate } = require('./../middleware/authenticate');

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

    app.post('/salles', authenticate, (req, res) => {
        if (req.body.type == "bailleur") {
            req.body.data.idBailleur = req.body.user_id;
            var salle = new Salle(req.body.data);
            console.log(salle)
            salle.save().then(result => {
                res.sendStatus(201);
            });
        } else {
            res.status(50).send('ERR_TYPE_INVALID');
        }
    });

}
