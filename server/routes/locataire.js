const Locataire = require('./../models/locataire');

module.exports = (app) => {

  // app.post('/films', (req, res) => {
  //   var film = new Film(req.body.film);
  //   film.save().then(result => {
  //     res.sendStatus(201);
  //   })
  // })


  app.get('/locataires', (req, res) => {
    Locataire.find({})
    .then(locataires => {
      res.send(locataires);
    })
  })

}
