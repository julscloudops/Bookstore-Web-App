const mongoose = require('mongoose'),
      cloudinary = require('cloudinary'),
      Oferta = require('./model');

exports.registrarOfertaHTML = (req, res) => {
  try {
    res.sendFile('registro-oferta.html', {
      root: 'public'
    });
  } catch (err) {
    res.json({
      message: err
    })
  }
}

exports.registrarOferta = async (req, res) => {

 // Se guarda la imagen en cloudinary y la dirección de la imagen en la base de datos
 const result = await cloudinary.v2.uploader.upload(req.file.path);

 //Se crea una nueva oferta
 const nuevaOferta = new Oferta({
    name: req.body.name,
    discount: req.body.discount,
    startDate: req.body.startDate, 
    endDate: req.body.endDate, 
    description: req.body.description,
    imgUrl: result.url,
    cloudinary_id: result.public_id,
    idLibreria: req.session.idLibreria
 });

 //Guarda el nuevo usuario en la base de datos
 const ofertaGuardada = await nuevaOferta.save();
 
 console.log(ofertaGuardada);

 req.session.idOferta = ofertaGuardada._id;

 console.log(req.session);

res.redirect(`/oferta/views/${ofertaGuardada._id}`);


}

exports.HTMLView = (req, res) => {
  try {
    res.sendFile('página-oferta.html', {
      root: 'public'
    });
  } catch (err) {
    res.json({
      message: err
    })
  }

}


exports.listarOferta = async (req, res) => {
  try {
    const oferta = await Oferta.findById({
      _id: req.params.idOferta
    });
    res.json(oferta);
  } catch(err){
    res.json({
      message: err
    })
  }
}