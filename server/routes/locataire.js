const Locataire = require('./../models/locataire');

module.exports = (app) => {

  // app.post('/films', (req, res) => {
  //   var film = new Film(req.body.film);
  //   film.save().then(result => {
  //     res.sendStatus(201);
  //   })
  // })


  app.get('/salles', (req, res) => {
    Salle.find({})
    .then(salles => {
      res.send(salles);
    })
  })

}
