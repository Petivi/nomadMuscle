const Locataire = require('./../models/locataire');
const { authenticate } = require('./../middleware/authenticate');
const nodemailer = require("nodemailer");
const fonctions = require('../utils/fonction');


module.exports = (app) => {

  app.get('/locataires', authenticate, (req, res) => {
    if(req.body.type == "locataire"){
      Locataire.find({ _id: req.body.user_id }, { "__v": 0, "password":0, "token":0 })
      .then(locataires => {
        res.send(locataires);
      })
    }else {
      res.send({error:"ERR_TYPE_INVALID"});
    }
  })

  app.post('/locataires', (req, res) => {
    var locataire = new Locataire(req.body.data);
    locataire.solde = 0;
    locataire.save().then(result => {
      res.status(201).send({response: 'created'});
    });
  });


  app.patch('/locataires/solde', authenticate, (req, res) => {
    var user_id = req.body.user_id
    if(req.body.type == "locataire"){
      var add_solde = req.body.data.solde;
      Locataire.find({ _id: user_id })
        .then(locataire => {
          var user_solde = locataire[0].solde;
          var user_mail = locataire[0].mail;
          var user_nom = locataire[0].nom;
          var user_prenom = locataire[0].prenom;
          var new_solde = user_solde + add_solde;
          Locataire.findOneAndUpdate({_id:user_id}, {solde: new_solde}).then(locataire => {
            var mail_subject = "Créditation du solde";
            var mail_content = `Votre solde a bien été crédité de `+add_solde+` €.<br> Votre solde est désormais de `+new_solde+` €.`;
            fonctions.sendCustomMail(user_mail, user_nom, user_prenom, mail_subject, mail_content);
            res.send({response:"BALANCE_EDITED"});
          });
        })
    }else {
      res.send({error:"ERR_TYPE_INVALID"});
    }
  });

}
