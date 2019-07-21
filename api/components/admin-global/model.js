const mongoose = require('mongoose');

const modeloAdminGlobal = new mongoose.Schema({
          firstName: {type: String},
          lastName: {type: String},
          email: { type: String, required: true, unique: true},    
          phone: {type: String},    
          password: {type: String}
        });

module.exports = mongoose.model('adminGlobal', modeloAdminGlobal);

