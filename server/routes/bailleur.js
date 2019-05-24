const Bailleur = require('./../models/bailleur');
const { authenticate } = require('./../middleware/authenticate');
const fs = require('fs');
const Busboy = require('busboy');


module.exports = (app) => {

    app.get('/bailleurs', authenticate, (req, res) => {
        if (req.body.type == "bailleur") {
            Bailleur.find({ _id: req.body.user_id }, { "__v": 0, "password": 0, "token": 0 })
                .then(bailleurs => {
                    res.send(bailleurs);
                });
        } else {
            res.send({ error: "ERR_TYPE_INVALID" });
        }
    });


    app.post('/bailleurs', (req, res) => {
        let bailleur = new Bailleur(req.body.data);
        bailleur.save()
            .then(() => {
                res.status(201).send({ response: 'true' });
            }).catch(err => {
                res.status(400).send({ response: "Ajout d'un bailleur impossible" });
            });
    });


    app.post('/bailleurs/pieceId', authenticate, (req, res) => {
        let newFileName;
        if (req.body.user_id) {
            var busboy = new Busboy({ headers: req.headers });

            busboy.on('file', function (fieldname, file, filename, encoding) {
                let ext = filename.split('.');
                ext = ext[ext.length - 1];
                newFileName = req.body.user_id + '.' + ext;
                let dirName = __dirname.split('\\');
                dirName.pop();
                dirName = dirName.join('\\')
                var saveTo = dirName + '/public/bailleurs/' + newFileName;
                file.pipe(fs.createWriteStream(saveTo));
            });

            busboy.on('finish', function () {
                Bailleur.findOneAndUpdate({ _id: req.body.user_id }, { pieceId: newFileName }).then(() => {
                    res.send({ response: true });
                })
            });

            req.pipe(busboy);
        } else {
            res.send({ error: "ERR_NO_USER_ID" });
        }
    })

}
