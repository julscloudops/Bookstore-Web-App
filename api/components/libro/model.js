const mongoose = require('mongoose');

const modeloLibro = mongoose.Schema({
  author : {type : String},
  idAutor: {type: String},
  price: { type: Number},
  title: { type: String},
  isbn: { type: String},
  genero: { type: String},
  categoria: { type: String},
  editorial: {type : String},        
  description: {type: String},
  imgUrl: { type: String},
  cloudinary_id: {type: String},
  idAdminLibreria: {type: String},
  rating : {type: Number, default: 1}
});

module.exports = mongoose.model('Libro', modeloLibro, 'libros');
