const Bailleur = require('./../models/bailleur');

module.exports = (app) => {

  // app.post('/films', (req, res) => {
  //   var film = new Film(req.body.film);
  //   film.save().then(result => {
  //     res.sendStatus(201);
  //   })
  // })


  app.get('/bailleurs', (req, res) => {
    Bailleur.find({})
    .then(bailleurs => {
      res.send(bailleurs);
    })
  })

}
