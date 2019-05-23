const Bailleur = require('./../models/bailleur');
const { authenticate } = require('./../middleware/authenticate');

module.exports = (app) => {

    app.get('/bailleurs', authenticate, (req, res) => {
      if(req.body.type == "bailleur"){
        Bailleur.find({ _id: req.body.user_id })
        .then(bailleurs => {
          res.send({ reponse: bailleurs });
        });
      }else {
        res.send({error:"ERR_TYPE_INVALID"});
      }
    });


    app.post('/bailleurs', (req, res) => {
        let bailleur = new Bailleur(req.body.data);
        bailleur.save()
            .then(() => {
                res.status(201).send({ response: 'true' });
            }).catch(err => {
                res.status(400).send({ response: "Ajout d'un bailleur impossible" });
            });
    });

}
