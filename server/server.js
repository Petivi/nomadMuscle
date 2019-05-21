const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const populate = require('./db/populate');
const salleRoutes = require('./routes/salle');
const locataireRoutes = require('./routes/locataire');
const bailleurRoutes = require('./routes/bailleur');
const transactionRoutes = require('./routes/transaction');
const loginRoutes = require('./routes/login');

var app = express();
const PORT = 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

mongoose.connect(
    'mongodb://localhost:27017/nomadMuscle',
    {
        useNewUrlParser: true,
        useFindAndModify: false
    }
).then(res => {
    console.log('MongoDB connected');

    salleRoutes(app);
    locataireRoutes(app);
    bailleurRoutes(app);
    transactionRoutes(app);
    loginRoutes(app);
    app.listen(PORT, () => {
        console.log(`Serveur node écoutant le port ${PORT}...`);
        //populate.insert();
    });
});



app.get('/films', (req, res) => {
    res.send({ oui: 'non' });
})
