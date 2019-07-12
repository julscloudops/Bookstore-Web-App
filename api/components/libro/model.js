const mongoose = require('mongoose');

const modeloLibro = mongoose.Schema({
  ISBN : {type : String},
  title: { type: String},
  author: { type: String},
  genre: { type: String},
  editorial: {type : String},        
  price : {type : Number},
  description: {type: String},
  bookImg: { type: String,}
});
    
     
module.exports = mongoose.model('Libro', modeloLibro);
