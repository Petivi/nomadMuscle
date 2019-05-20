const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JourSchema = new Schema({
    titre: { type: String, required: true },
    debut: Number,
    fin: Number
})

// const Jour = mongoose.model('jour', JourSchema);

module.exports = JourSchema;
