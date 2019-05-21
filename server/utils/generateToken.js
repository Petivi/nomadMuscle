const jwt = require('jsonwebtoken');
const security = require('./../config/security');
const Locataire = require('./../models/locataire');
const Bailleur = require('./../models/bailleur');


var generateToken = (user_id, typeUser) => {
  return new Promise((resolve, reject) => {
    var token = jwt.sign({user_id}, security.JWT_SECRET);
    if(typeUser == "locataire"){
      Locataire.findOneAndUpdate({_id:user_id}, {token: token}).then(locataire => {
        resolve(token);
      });
    }else if (typeUser == "bailleur") {
      Bailleur.findOneAndUpdate({_id:user_id}, {token: token}).then(bailleur => {
        resolve(token);
      });

    }
  });
};


module.exports = { generateToken }
