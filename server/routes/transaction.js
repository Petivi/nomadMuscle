const Transaction = require('./../models/transaction');

module.exports = (app) => {

    app.get('/transactions', (req, res) => {
        Transaction.find({})
            .then(transactions => {
                res.send(transactions);
            });
    });

    app.get('/transactions/:id', (req, res) => {
        Transaction.find({ _id: req.params.id })
            .then(transaction => {
                res.send(transaction);
            });
    });

    app.post('/transactions', (req, res) => {
        var transaction = new Transaction(req.body);
        transaction.save().then(result => {
            res.sendStatus(201);
        });
    });

    app.patch('/transactions/:id', (req, res) => { //patch = remplacement partiel d'un element put remplacement global
        let annulee = req.body;
        Transaction.findOneAndUpdate(req.params.id, annulee).then(() => {
            res.sendStatus(200);
        });
    });

}
