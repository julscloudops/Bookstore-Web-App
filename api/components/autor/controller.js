const cloudinary = require('cloudinary'),
      Autor = require('./model');

// Permite subir las imagenes a la nube
  cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
  
//Registrar autor
exports.registrarAutor = async(req, res) => {

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

const savedAuthor = await newAuthor.save();
console.log(savedAuthor);
res.send('El autor fue registrado exitosamente');

}


exports.listarAutores = async (req, res) => {
  await Autor.find({}, (err, data) => {
    res.json(data);
  });
}



