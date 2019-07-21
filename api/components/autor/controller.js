const cloudinary = require('cloudinary'),
  Autor = require('./model');

//Registrar autor
exports.registrarAutor = async (req, res) => {

  console.log(req.body);

  // Este es el objeto que regresa multer, ocupamos el file.path local para subir la imagen a la nube
  console.log(req.file.path);

  // Se guarda la imagen en cloudinary y la dirección de la imagen en la base de datos
  const result = await cloudinary.v2.uploader.upload(req.file.path);

  console.log(result);

  const newAuthor = new Autor({
    name: req.body.name,
    description: req.body.description,
    imgUrl: result.url,
    cloudinary_id: result.public_id
  });

  try {
    const savedAuthor = await newAuthor.save();
    res.json(savedAuthor);
  } catch (err) {
    res.json({
      message: err
    });
  }

}

// exports.listarAutor = async (req, res) => {
//   try {
//     const autores = await Autor.find({});
//     res.json(autores);
//   } catch (err) {
//     res.json({
//       message: err
//     })
//   }
// }