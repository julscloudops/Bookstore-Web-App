const cloudinary = require('cloudinary'),
           Libreria = require('./model');

exports.registrarLibreria = async (req, res) => {

  // Se guarda la imagen en cloudinary y la dirección de la imagen en la base de datos
  const result = await cloudinary.v2.uploader.upload(req.file.path);

  //Se crea una nueva libreria
  const newLibreria = new Libreria({
    nombreFantasia: req.body.nombreFantasia,
    nombreComercial: req.body.nombreComercial,
    email: req.body.email,
    phone: req.body.phone,
    description: req.body.description,
    imgUrl: result.url,
    cloudinary_id: result.public_id,
    idAdminLibreria: req.session.idAdminLibreria
  });

  const savedLibreria = await newLibreria.save();
  
  console.log(savedLibreria);

  req.session.idLibreria = savedLibreria._id;

  console.log(req.session);

  res.redirect(`/libreria/admin/${savedLibreria._id}`);

}

exports.listarLibrerias = async (req, res) => {
  try {
    const librerias = await Libreria.find();
    res.json(librerias);
  } catch (err) {
    res.json({
      message: err
    });
  }
}

exports.listarLibreriasHomePage = async (req, res) => {
  try {
    const librerias = await Libreria.find().limit(5);
    res.json(librerias);
  } catch (err) {
    res.json({
      message: err
    });
  }
}



exports.listarLibreria = async (req, res) => {
  try {
    const libreria = await Libreria.findById(req.params.idLibreria);
    res.json(libreria);
  } catch (err) {

  }
}

exports.HTMLView = async (req, res) => {
  try {
    res.sendFile('libreria.html', {
      root: 'public'
    });
  } catch (err) {
    res.json({
      message: err
    })
  }

}


exports.listarLibreriasHTML = async (req, res) => {
  try {
    res.sendFile('librerias.html', {
      root: 'public'
    });
  } catch (err) {
    res.json({
      message: err
    })
  }
}



