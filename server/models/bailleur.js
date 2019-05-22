const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BailleurSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
    mail: { type: String, required: true },
    pieceId: String,
    solde: Number,
    password: { type: String, required: true },
    token: String
})


const Bailleur = mongoose.model('bailleur', BailleurSchema);


module.exports = Bailleur;
