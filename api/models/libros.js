const mongoose = require('mongoose');

const modeloLibros = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  imagenLibro: { type: String, required: true}
});

module.exports = mongoose.model('Libro', modeloLibros);
