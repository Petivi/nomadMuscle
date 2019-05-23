const Bailleur = require('./../models/bailleur');
const { authenticate } = require('./../middleware/authenticate');
const fs = require('fs');
const Busboy = require('busboy');


module.exports = (app) => {

    app.get('/bailleurs', authenticate, (req, res) => {
      if(req.body.type == "bailleur"){
        Bailleur.find({ _id: req.body.user_id }, { "__v": 0, "password":0, "token":0 })
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


    app.post('/bailleurs/pieceId', authenticate, (req, res) => {

      var busboy = new Busboy({headers: req.headers});

      busboy.on('file', function(fieldname, file, filename, encoding) {
        var saveTo = __dirname + '/public/pieceId/' + req.body.user_id;
        file.pipe(fs.createWriteStream(saveTo));
      });

      busboy.on('finish', function(){
        res.sendStatus(200);
      })

      req.pipe(busboy);
    })

}
