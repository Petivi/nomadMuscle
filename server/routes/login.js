const Locataire = require('./../models/locataire');
const Bailleur = require('./../models/bailleur');
const {cryptPassword} = require('./../middleware/cryptPassword');
const bcrypt = require('bcryptjs');
const {generateToken} = require('./../utils/generateToken');




module.exports = (app) => {

  app.post('/inscription', cryptPassword, (req, res) =>{
    var typeUser = req.body.type;
    req.body.data.solde = 0;
    var mail = req.body.data.mail;
    req.body.data.token = "";
    if(typeUser == "locataire"){
      Locataire.find({ mail: mail })
        .then(locataire => {
          if(locataire.length != 0){
            res.send('ERR_MAIL_TAKEN');
          }else {
            var locataire = new Locataire(req.body.data);
            locataire.save().then(result => res.sendStatus(201));
          }
        })
    }else if (typeUser == "bailleur") {
      Bailleur.find({ mail: mail })
          .then(bailleur => {
              if(bailleur.length != 0){
                res.send('ERR_MAIL_TAKEN');
              }else {
                var bailleur = new Bailleur(req.body.data);
                bailleur.save().then(result => res.sendStatus(201));
              }
          });
    }else {
      res.send('ERR_TYPE_UNKNOWN');
    }

  });


  app.post('/login', (req, res) =>{
    var typeUser = req.body.type;
    var mail = req.body.data.mail;
    var password = req.body.data.password;
    var user_hashed_password = "";
    var user_id = "";

    if(typeUser == "locataire"){
      Locataire.find({ mail: mail })
        .then(locataire => {
          user_hashed_password = locataire[0].password;
          user_id = locataire[0]._id;
          password_verify(password, user_hashed_password, user_id, typeUser, res);
        })
    }else if (typeUser == "bailleur") {
      Bailleur.find({ mail: mail })
          .then(bailleur => {
            user_hashed_password = bailleur[0].password;
            user_id = bailleur[0]._id;
            password_verify(password, user_hashed_password, user_id, typeUser, res);
          });
    }else {
      res.send('ERR_TYPE_UNKNOWN');
    }
});


  function password_verify(password, user_hashed_password, user_id, typeUser, res){
    bcrypt.compare(password, user_hashed_password, (err, result) => {
        if(result){
          // res.status(200).send('PASSWORD_MATCH');

          generateToken(user_id, typeUser)
          .then(token => {
            res.header('x-auth', token).send('PASSWORD_MATCH');
          });
        }else {
          res.status(200).send('PASSWORD_NOT_MATCH');
        }
    });
  }

}
