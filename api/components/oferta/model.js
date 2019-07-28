const mongoose = require('mongoose');

const modeloOferta = mongoose.Schema({
  name: {type: String},
  sucursales: [],
  discount: {type: String},
  startDate: { type: Date},
  endDate: {type : Date},  
  description: {type: String},
  imgUrl: { type: String},
  cloudinary_id: {type: String},
  idSucursal: {type: String},
  idLibreria: {type: String}
});


module.exports = mongoose.model('Oferta', modeloOferta, 'ofertas');
