const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const PORT = 3000;
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.listen(PORT, () => {
  console.log(`Serveur node écoutant le port ${PORT}...`);
});

app.get('/films', (req, res) => {
  res.send({oui:'non'});
})
