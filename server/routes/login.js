const Locataire = require('./../models/locataire');
const Bailleur = require('./../models/bailleur');
const {cryptPassword} = require('./../middleware/cryptPassword');


module.exports = (app) => {


//   app.post('/login', (req, res) =>{
//   var {mail, password} = req.body;
//   connection.query("SELECT * FROM prof WHERE mail LIKE '"+ mail+"' AND password LIKE '" + password + "'", function (err, user, fields) {
//     if (err) throw err;
//     if(user.length > 0){
//
//
//       generateToken(user[0].id)
//       .then(token => {
//         res.header('x-auth', token).send('PASSWORD_MATCH');
//       });
//     }else {
//       res.status(200).send('USER_NOT_FOUND');
//     }
//   });
// });

  app.post('/inscription', cryptPassword, (req, res) =>{
    var typeUser = req.body.type;
    if(typeUser == "locataire"){
      var locataire = new Locataire(req.body.data);
      locataire.save().then(result => res.sendStatus(201));
    }else if (typeUser == "bailleur") {
      var bailleur = new Bailleur(req.body.data);
      bailleur.save().then(result => res.sendStatus(201));
    }else {
      res.send('ERR_TYPE_UNKNOWN');
    }

  });

}
