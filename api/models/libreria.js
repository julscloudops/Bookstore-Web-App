const mongoose = require('mongoose');

const modeloLibreria = new mongoose.Schema({
          nombreComercial: {type: String},
          nombreFantasia: {type: String},
          description: {type: String},
          provincia: {type: String},
          canton: {type: String},
          distrito: {type: String},
          direction: {type: String
          }

});



module.exports = mongoose.model('Libreria', modeloLibreria);

