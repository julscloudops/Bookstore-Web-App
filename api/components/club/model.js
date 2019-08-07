const mongoose = require('mongoose');

const modeloClub = mongoose.Schema({
    adminClub: {type: String},
    idLibreria: {type: String},  
    name: {type: String},
    meetingDate: {type: Date},
    categoria: {type: String},
    libroPorLeer: {type: Array},
    meetingPlace: {type: Array},
    description: {type: String},
    imgUrl: {type: String},
    cloudinary_id: {type: String}
});

module.exports = mongoose.model('Club', modeloClub, 'clubes');
