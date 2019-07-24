const cloudinary = require('cloudinary'),
           Libreria = require('./model');

exports.registrarLibreria = async (req, res) => {

  // Se guarda la imagen en cloudinary y la dirección de la imagen en la base de datos
  const result = await cloudinary.v2.uploader.upload(req.file.path);

  //Se crea una nueva libreria
  const newLibreria = new Libreria({
    nombreComercial: req.body.nombreComercial,
    nombreFantasia: req.body.nombreFantasia,
    description: req.body.description,
    provincia: req.body.provincia,
    canton: req.body.canton,
    distrito: req.body.distrito,
    direction: req.body.location,
    imgUrl: result.url,
    cloudinary_id: result.public_id,
    adminLibreriaId: req.session.adminLibreriaId
  });

  const savedLibreria = await newLibreria.save();

  console.log(savedLibreria);
  res.send('Libreria registrada exitosamente!');

  req.session.libreriaId = savedLibreria._id;

  console.log(req.session);

}

exports.listarLibrerias = async (req, res) => {
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
    const libreria = Libreria.findById({_id: req.params.idLibreria});
    res.json(libreria);
  } catch (err) {

  }
}