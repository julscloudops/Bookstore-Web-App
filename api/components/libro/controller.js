const ISBN = require('isbn-validate'),
      cloudinary = require('cloudinary'),
      Libro = require('./model');


// Permite subir las imagenes a la nube
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});


exports.registrarLibro = async (req, res) => {

//  //Validación de ISBN 
// const isbnValidation = ISBN.Validate(req.body.isbn);
// console.log(isbnValidation);

// if (isbnValidation != true) return res.status(400).send('Código ISBN invalido');

// //Busca que no exista otro libro con el mismo código ISBN
// const isbnExists = await Libro.findOne({
//   isbn: req.body.isbn
// });
// if (isbnExists) return res.status(400).send('Ya se encuentra un libro registrado con ese código ISBN');

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

exports.listarLibros = async (req, res) => {
  Libro.find({ }, (err, data) => {
    res.json(data);
  });
}

  // .select('_id title author genre editorial imgUrl')
  // .exec()
  // .then(docs => {
  //         let x = 10;
  //         const res = {
  //         count: docs.length,
  //         libros: docs.map(doc => {
  //           return {
  //             _id: doc._id,
  //             title: doc.title,
  //             author: doc.author,
  //             genre: doc.genre,
  //             editorial: doc.editorial,
  //             imgUrl: doc.imgUrl,
  //             request: {
  //               type: 'GET',
  //               url: 'http://localhost:8080/libros/'+doc._id
  //             }
  //           }
  //         })
  //       };
      

