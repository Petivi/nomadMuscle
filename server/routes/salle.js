const Salle = require('./../models/salle');
const { authenticate } = require('./../middleware/authenticate');

module.exports = (app) => {

    app.get('/salles', authenticate, (req, res) => {
      if(req.body.type == 'bailleur'){
        Salle.find({ idBailleur: req.body.user_id })
        .then(salles => {
          if(salles.length != 0){
            res.send({response:salles});
          }else {
            res.send({response: 'NO_ITEMS_FOUND'});
          }
        });
      }else if (req.body.type == 'locataire') {
        Salle.find({})
        .then(salles => {
          if(salles.length != 0){
            res.send({response:salles});
          }else {
            res.send({response: 'NO_ITEMS_FOUND'});
          }
        });
      }else {
        res.send({error:'ERR_TYPE_INVALID'});
      }
    });

    app.get('/salles/:id', (req, res) => {
        Salle.find({ _id: req.params.id })
            .then(salles => {
                res.send({response: salles});
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
