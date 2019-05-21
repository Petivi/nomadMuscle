const Jour = require('./jour');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    idSalle: { type: String, required: true },
    idLocataire: { type: String, required: true },
    montant: { type: Number, required: true },
    date: { type: Date, required: true },
    debut: { type: Number, required: true },
    fin: { type: Number, required: true },
    confirmee: { type: Boolean, required: true },
    annulee: Boolean,
});


const Transaction = mongoose.model('transaction', TransactionSchema);


module.exports = Transaction;
