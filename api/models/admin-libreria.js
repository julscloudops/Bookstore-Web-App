const mongoose = require('mongoose');

// const tokenSchema = new mongoose.Schema({
//   _id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'adminLibreria'},
//   token: {type: String, required: true},
//   createdAt: {type: Date, required: true, default: Date.now, expires: 43200}
// });

const modeloAdminLibreria = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, 
           required: true,
           unique: true,
           match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
          },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false},
  nombre: {type: String},
  apellido: {type: String},
  telefono: {type: String, unique: true},
  fechaNacimiento: {type: Date, required: true},
  genero: {type: String},
  tipoIdentificacion: {type: String},
  cedula: {type: String, unique: true},
  provincia: {type: String},
  canton: {type: String},
  distrito: {type: String},
  direccion: {type: String}
});

module.exports = mongoose.model('adminLibreria', modeloAdminLibreria);