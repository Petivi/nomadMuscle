const Salle = require('./../models/salle');
const { authenticate } = require('./../middleware/authenticate');

module.exports = (app) => {

    app.get('/salles', (req, res) => {
        Salle.find({})
            .then(salles => {
                res.send({ response: salles });
            });
    });

    app.get('/salles/:id', (req, res) => {
        Salle.find({ _id: req.params.id })
            .then(salles => {
                res.send({ 'reponse': salles });
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
