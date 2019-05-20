const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocataireSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: String, required: true },
    mail: { type: String, required: true },
    pieceId: { type: String, required: true },
    certificat: { type: String, required: true },
    solde: { type: Number, required: true },
})


const Locataire = mongoose.model('locataire', LocataireSchema);


module.exports = Locataire;
