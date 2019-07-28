const mongoose = require('mongoose');

const modeloSucursal = new mongoose.Schema({
          horario: {type: String},
          phone: {type: String},
          provincia: {type: String},
          canton: {type: String},
          distrito: {type: String},
          direction: {type: String},
          googleMaps: {type: String},
          imgUrl: {type: String},
          cloudinary_id: {type: String},
          idLibreria: {type: String, unique: true}
});


module.exports = mongoose.model('Sucursal', modeloSucursal, 'sucursales');

