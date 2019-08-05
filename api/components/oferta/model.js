const mongoose = require('mongoose');

const modeloOferta = mongoose.Schema({
  name: {type: String},
  discount: {type: String},
  startDate: { type: Date},
  endDate: {type : Date},  
  description: {type: String},
  imgUrl: { type: String},
  cloudinary_id: {type: String},
  idLibreria: {type: String},
  sucursales: {type: Array},

});


module.exports = mongoose.model('Oferta', modeloOferta, 'ofertas');
