const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BailleurSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: String, required: true },
    adresse: { type: String, required: true },
    pieceId: { type: String, required: true },
    solde: { type: Number, required: true },
})


const Bailleur = mongoose.model('bailleur', BailleurSchema);


module.exports = Bailleur;
