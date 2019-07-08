const mongoose = require('mongoose');

const modeloLibro = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,        
  isbn : {type : String, required : true},
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  editorial: {type : String, required : true},        
  price : {type : Number, required : true},
  bookImg: { type: String, required: true}
});
    
     

module.exports = mongoose.model('Libro', modeloLibro);
