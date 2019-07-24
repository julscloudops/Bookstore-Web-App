const mongoose = require('mongoose');

const modeloLibreria = new mongoose.Schema({
          nombreComercial: {type: String},
          nombreFantasia: {type: String},
          description: {type: String},
          provincia: {type: String},
          canton: {type: String},
          distrito: {type: String},
          direction: {type: String},
          imgUrl: {type: String},
          cloudinary_id: {type: String},
          adminLibreriaId: {type: String, unique: true}
});

module.exports = mongoose.model('Libreria', modeloLibreria, 'librerias');

