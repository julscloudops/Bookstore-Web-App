const cloudinary = require('cloudinary'),
      Sucursal = require('./model');

exports.registrarSucursal = async (req, res) => {

// Se guarda la imagen en cloudinary y la dirección de la imagen en la base de datos
  const result = await cloudinary.v2.uploader.upload(req.file.path);

  //Se crea una nueva sucursal
 const newSucursal = new Sucursal({
  horario: req.body.phone,
  phone: req.body.phone,
  description: req.body.description,
  provincia: req.body.provincia, 
  canton: req.body.canton, 
  distrito: req.body.distrito, 
  direction: req.body.location,
  googleMaps: req.body.location,
  imgUrl: result.url,
  cloudinary_id: result.public_id,
  idLibreria: req.session.idLibreria

});

try { 
  console.log(req.body);
  const savedSucursal = await newSucursal.save();
  
  req.session.idLibreria.idSucursal = savedSucursal._id;
  console.log(req.session);

  res.redirect(`/sucursal/admin/views/${savedSucursal._id}`);

} catch(err){
  res.json({message: err});
}
}

exports.listarSucursal = async (req, res) => {
  try {
    const sucursal = await Sucursal.findById({
      _id: req.params.idSucursal
    });
    res.json(sucursal);
  } catch(err){
    res.json({
      message: err
    })
  }
}

exports.listarSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.find({libreriaId: req.session.libreriaId});
    res.json(sucursales);
    
  } catch (err) {
    res.json({
      message: err
    })
  }
}

exports.HTMLView = (req, res) => {
  try {
    res.sendFile('página-sucursal.html', {
      root: 'public'
    });
  } catch (err) {
    res.json({
      message: err
    })
  }

}

exports.HTMLViewAdmin = (req, res) => {
  try {
    res.sendFile('página-sucursal-adminLibreria.html', {
      root: 'public'
    });
  } catch (err) {
    res.json({
      message: err
    })
  }

}
