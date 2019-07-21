const mongoose = require('mongoose');

const modeloSucursal = new mongoose.Schema({
          nombreComercial: {type: String},
          nombreFantasia: {type: String},
          phone: {type: String},
          provincia: {type: String},
          canton: {type: String},
          distrito: {type: String},
          direction: {type: String},
          latitude: {type: String},
          longitude: {type: String},
          imgUrl: {type: String},
          cloudinary_id: {type: String}
});


module.exports = mongoose.model('Sucursal', modeloSucursal);

