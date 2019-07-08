const mongoose = require('mongoose');

const modeloAdminLibreria = new mongoose.Schema({
          firstName: {type: String},
          lastName: {type: String},
          email: { type: String, required: true, unique: true},        
          phone: {type: String},
          birthDate : {type: Date},
          gender: {type: String},
          idType: {type: String},          
          id: {type: String},
          provincia: {type: String},
          canton: {type: String},
          distrito: {type: String},
          direction: {type: String},
          password: {type: String},
          isVerified: { type: Boolean, default: false}

        });


module.exports = mongoose.model('adminLibreria', modeloAdminLibreria);

