const Salle = require('./../models/salle');
const {authenticate} = require('./../middleware/authenticate');

module.exports = (app) => {

    app.get('/salles', (req, res) => {
        Salle.find({})
            .then(salles => {
                res.send({'response':salles});
            });
    });

    app.get('/salles/:id', (req, res) => {
        Salle.find({ _id: req.params.id })
            .then(salles => {
                res.send({'reponse': salles});
            });
    });

    app.post('/salles', authenticate, (req, res) => {
        if(req.body.type == "bailleur"){
          var salle = new Salle(req.body.data);
          salle.save().then(result => {
            res.status(201).send({'response':'true'});
          });
        }else {
          res.send({'error':'ERR_TYPE_INVALID'});
        }
    });

}
