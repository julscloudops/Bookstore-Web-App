const mongoose = require('mongoose');

const modeloLibreria = new mongoose.Schema({
          nombreFantasia: {type: String},
          nombreComercial: {type: String},
          email: {type: String},
          phone: {type: String},
          description: {type: String},
          imgUrl: {type: String},
          cloudinary_id: {type: String},
          adminLibreriaId: {type: String, unique: true}
});

module.exports = mongoose.model('Libreria', modeloLibreria, 'librerias');

