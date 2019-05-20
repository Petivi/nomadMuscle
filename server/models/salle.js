const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Jour = require('./jour');

const SalleSchema = new Schema({
    idBailleur: { type: String },
    nom: { type: String },
    adresse: { type: String, required: true },
    dimension: { type: Number, required: true},
    equipements: [
      { type: String}
    ],
    utilisateurMax: { type: Number, required: true },
    disponibilite: { semaine: [
      {type: Jour, required: true}
    ],
    mois: String,
    exception: [Date]
  },
  service: [
    { type: String }
  ],
  photo: [
    { type: String }
  ],
  validationAuto:{ type: Boolean },
  tarifHoraire: { type: Number },
  pourcentageRemboursement: { type: Number }
})


const Salle = mongoose.model('salle', SalleSchema);


module.exports = Salle;
