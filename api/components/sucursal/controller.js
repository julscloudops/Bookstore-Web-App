const cloudinary = require('cloudinary'),
      Sucursal = require('./model');

exports.registrarSucursal = async (req, res) => {

// Se guarda la imagen en cloudinary y la dirección de la imagen en la base de datos
  const result = await cloudinary.v2.uploader.upload(req.file.path);

  //Se crea una nueva sucursal
 const newSucursal = new Sucursal({
  nombreComercial: req.body.nombreComercial,
  nombreFantasia: req.body.nombreFantasia, 
  phone: req.body.phone,
  provincia: req.body.provincia, 
  canton: req.body.canton, 
  distrito: req.body.distrito, 
  direction: req.body.location,
  googleMaps: req.body.location,
  imgUrl: result.url,
  cloudinary_id: result.public_id

});

try { 
  console.log(req.body);
  const savedSucursal = await newSucursal.save();
  res.json(savedSucursal);
  
  req.session.libreriaId.SucursalId = savedSucursal._id;
  console.log(req.session);

} catch(err){
  res.json({message: err});
}
}