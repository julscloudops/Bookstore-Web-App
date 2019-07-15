const mongoose = require('mongoose');

const modeloUsuario = new mongoose.Schema({ 
            firstName: {type: String},
            lastName: {type: String},
            email: { type: String, required: true, unique: true},   
            phone: {type: String},
            birthDate : {type: Date},
            age: {type: String},
            gender: {type: String},
            idType: {type: String},          
            id: {type: String},
            provincia: {type: String},
            canton: {type: String},
            distrito: {type: String},
            direction: {type: String},
            imgUrl: {type: String},
            cloudinary_id: {type: String},
            password: {type: String}
        });


module.exports = mongoose.model('User', modeloUsuario);

