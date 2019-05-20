const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const PORT = 3000;



app.listen(PORT, () => {
  console.log(`Serveur node écoutant le port ${PORT}...`);
});

app.get('/films', (req, res) => {
  res.send({oui:'non'});
})
