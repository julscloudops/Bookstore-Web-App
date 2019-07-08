const mongoose = require('mongoose');

const modeloSucursal = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,        
       nombre : {type : String, required : true},
       telefono : {type : String, required : true},
       direccion_exacta : {type : String, required : true},
       ubicacion : {type: String,  required : true}
    }
);

module.exports = mongoose.model('Sucursal', modeloSucursal);