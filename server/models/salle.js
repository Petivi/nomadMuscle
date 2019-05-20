const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmSchema = new Schema({
    titre: { type: String, required: true },
    realisateur: { type: String, required: true },
    duree: { type: Number, required: true},
    annee: { type: Number, required: true},
    pays: { type: String, required: true },
    vost: { type: Boolean, default: false },
    acteurs: [
      { type: String}
    ]
})


const Film = mongoose.model('film', FilmSchema);


module.exports = Film;
