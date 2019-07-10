const mongoose = require('mongoose');

const authorModel = new mongoose.Schema({
          authorName: {type: String},
          description: {type: String},
          authorImg: {type: String}
          
});



module.exports = mongoose.model('Autor', authorModel);

