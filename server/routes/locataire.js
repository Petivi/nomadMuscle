const Locataire = require('./../models/locataire');
const { authenticate } = require('./../middleware/authenticate');
const nodemailer = require("nodemailer");
const fonctions = require('../utils/fonction');


module.exports = (app) => {

  app.get('/locataires', (req, res) => {
    Locataire.find({})
      .then(locataires => {
        res.send(locataires);
      })
  })

  app.get('/locataires/:id', (req, res) => {
    Locataire.find({ _id: req.params.id })
      .then(locataire => {
        res.send(locataire);
      })
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
