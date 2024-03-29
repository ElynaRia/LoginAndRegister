const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    nama: String,
    password: String,
    photo: String
}, {
    versionKey: false // menghilangkan __v di database mongodb
});

const KOLEKSI = mongoose.model('logins', dataSchema);
module.exports = KOLEKSI;

// rename logins for change collection name