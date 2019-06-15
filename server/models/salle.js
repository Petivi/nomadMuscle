const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Jour = require('./jour');

const SalleSchema = new Schema({
    idBailleur: { type: mongoose.Schema.Types.ObjectId, ref: 'Bailleur', required: true },
    nom: { type: String, required: true },
    adresse: { type: String, required: true },
    dimension: { type: Number, required: true },
    equipements: [
        { type: String }
    ],
    utilisateurMax: { type: Number, required: true },
    disponibilite: {
        semaine: [
            { type: Jour, required: true }
        ],
        exception: [
            {
                debut: Date,
                fin: Date
            }
        ],
        disponibilites: [
            {
                debut: Date,
                fin: Date
            }
        ],
        mois: { type: String, required: true }
    },
    service: [
        { type: String }
    ],
    photos: [
        { type: String }
    ],
    validationAuto: { type: Boolean },
    tarifHoraire: { type: Number },
    pourcentageRemboursement: { type: Number }
})


const Salle = mongoose.model('salle', SalleSchema);


module.exports = Salle;
