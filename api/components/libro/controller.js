const cloudinary = require('cloudinary'),
      Libro = require('./model');


// Permite subir las imagenes a la nube
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});


exports.registrarLibro = async (req, res) => {
 
// Se guarda la imagen en cloudinary y la dirección de la imagen en la base de datos
const result = await cloudinary.v2.uploader.upload(req.file.path);

//Se crea un nuevo libro
const nuevoLibro = new Libro({
  author: req.body.author, 
  // title: req.body.title, 
  price: req.body.price,
  isbn: req.body.isbn,
  genre: req.body.genre,
  editorial: req.body.editorial,
  description: req.body.description,
  imgUrl: result.url,
  cloudinary_id: result.public_id
});


//Guarda el nuevo usuario en la base de datos
const savedBook = await nuevoLibro.save();
console.log(savedBook);

res.send("Registro exitoso!");

}



