const Jour = require('./jour');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    idSalle: { type: String, required: true },
    idLocataire: { type: String, required: true },
    montant: { type: Number, required: true },
    jour: { type: Jour, required: true }
})


const Transaction = mongoose.model('transaction', TransactionSchema);


module.exports = Transaction;
