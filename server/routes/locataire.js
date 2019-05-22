const Locataire = require('./../models/locataire');

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
    console.log(req.body)
    var locataire = new Locataire(req.body.data);
    locataire.solde = 0;
    locataire.save().then(result => {
      res.status(201).send({response: 'created'});
    });
  });

}
