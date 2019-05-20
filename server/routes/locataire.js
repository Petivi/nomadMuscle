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
    var locataire = new Locataire(req.body);
    locataire.save().then(result => {
      res.sendStatus(201);
    });
  });

}
