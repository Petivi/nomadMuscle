const Locataire = require('./../models/locataire');
const Bailleur = require('./../models/bailleur');
const { cryptPassword } = require('./../middleware/cryptPassword');
const bcrypt = require('bcryptjs');
const { generateToken } = require('./../utils/generateToken');




module.exports = (app) => {

    app.post('/inscription', cryptPassword, (req, res) => {
        var typeUser = req.body.type;
        req.body.data.solde = 0;
        var mail = req.body.data.mail;
        req.body.data.token = "";
        if (typeUser == "locataire") {
            Locataire.find({ mail: mail })
                .then(locataire => {
                    if (locataire.length != 0) {
                        res.send({ error: 'ERR_MAIL_TAKEN' });
                    } else {
                        var locataire = new Locataire(req.body.data);
                        locataire.save().then(result => res.status(201).send({ response: true }));
                    }
                })
        } else if (typeUser == "bailleur") {
            Bailleur.find({ mail: mail })
                .then(bailleur => {
                    if (bailleur.length != 0) {
                        res.send({ error: 'ERR_MAIL_TAKEN' });
                    } else {
                        var bailleur = new Bailleur(req.body.data);
                        bailleur.save().then(result => res.status(201).send({ response: true }));
                    }
                });
        } else {
            res.send({ error: 'ERR_TYPE_UNKNOWN' });
        }

    });


    app.post('/login', (req, res) => {
        var typeUser = req.body.type;
        var mail = req.body.data.mail;
        var password = req.body.data.password;
        var user_hashed_password = "";
        var user_id = "";
        var user_pieceId = "";

        if (typeUser == "locataire") {
            Locataire.find({ mail: mail })
                .then(locataire => {
                    if (locataire[0]) {
                        user_hashed_password = locataire[0].password;
                        user_id = locataire[0]._id;
                        user_pieceId = locataire[0].pieceId;
                        password_verify(password, user_hashed_password, user_id, typeUser, user_pieceId, res);
                    } else {
                        res.status(200).send({ error: 'ERR_USER_UNKNOWN' });
                    }
                })
        } else if (typeUser == "bailleur") {
            Bailleur.find({ mail: mail })
                .then(bailleur => {
                    if (bailleur[0]) {
                        user_hashed_password = bailleur[0].password;
                        user_id = bailleur[0]._id;
                        user_pieceId = bailleur[0].pieceId;
                        password_verify(password, user_hashed_password, user_id, typeUser, user_pieceId, res);
                    } else {
                        res.status(200).send({ error: 'ERR_USER_UNKNOWN' });
                    }
                });
        } else {
            res.send({ error: 'ERR_TYPE_UNKNOWN' });
        }
    });


    function password_verify(password, user_hashed_password, user_id, typeUser, user_pieceId, res) {
        bcrypt.compare(password, user_hashed_password, (err, result) => {
            if (result) {
                generateToken(user_id, typeUser)
                    .then(token => {
                        res.header('x-auth', token).send({ response: 'PASSWORD_MATCH', token: token, user_pieceId: user_pieceId });
                    });
            } else {
                res.status(200).send({ error: 'PASSWORD_NOT_MATCH' });
            }
        });
    }

}
