const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocataireSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
    mail: { type: String, required: true },
    pieceId: String,
    certificat: String,
    solde: Number,
    password: { type: String, required: true },
    token: { type: String }
})


const Locataire = mongoose.model('locataire', LocataireSchema);


module.exports = Locataire;
