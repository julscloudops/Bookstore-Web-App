const mongoose = require('mongoose');

const modeloLibreria = new mongoose.Schema({
          nombreFantasia: {type: String},
          nombreComercial: {type: String},
          email: {type: String},
          phone: {type: String},
          description: {type: String},
          imgUrl: {type: String},
          cloudinary_id: {type: String},
          idAdminLibreria: {type: String}
});

module.exports = mongoose.model('Libreria', modeloLibreria, 'librerias');

