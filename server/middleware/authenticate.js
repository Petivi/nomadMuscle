const jwt = require('jsonwebtoken');
const security = require('./../config/security');
const Locataire = require('./../models/locataire');
const Bailleur = require('./../models/bailleur');


var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  var typeUser = "";
  if(token){
    try {
      var decode = jwt.verify(token, security.JWT_SECRET);
      var user_id = decode.user_id;
      Locataire.find({_id:user_id})
        .then(locataire => {
          if(locataire.length != 0){
            typeUser = "locataire";
          }else {
            Bailleur.find({ _id: user_id })
                .then(bailleur => {
                    if(bailleur.length != 0){
                      typeUser = "bailleur";
                    }
                    req.body.type = typeUser;
                    req.body.user_id = user_id
                    next();
                });
          }
        })
    } catch (e) {
      res.status(401).send();
      next();
    }
  }else {
    res.status(401).send();
  }
};


module.exports = { authenticate };
