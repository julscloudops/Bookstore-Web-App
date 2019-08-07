const ISBN = require('isbn-validate'),
  cloudinary = require('cloudinary'),
  Libro = require('./model');

exports.registrarLibro = async (req, res) => {

  // // Validación de ISBN 
  // const isbnValidation = ISBN.Validate(req.body.isbn);
  // console.log(isbnValidation);

  // if (isbnValidation != true) return res.status(400).send('Código ISBN invalido');

  //Busca que no exista otro libro con el mismo código ISBN
  const isbnExists = await Libro.findOne({
    isbn: req.body.isbn
  });
  if (isbnExists) return res.status(400).send('Ya se encuentra un libro registrado con ese código ISBN');

  // Se guarda la imagen en cloudinary y la dirección de la imagen en la base de datos
  const result = await cloudinary.v2.uploader.upload(req.file.path);

  //Se crea un nuevo libro
  const nuevoLibro = new Libro({
    author: req.body.author,
    idAutor: req.body.idAutor,
    title: req.body.title,
    price: req.body.price,
    isbn: req.body.isbn,
    genero: req.body.genero,
    categoria: req.body.categoria,
    editorial: req.body.editorial,
    description: req.body.description,
    imgUrl: result.url,
    cloudinary_id: result.public_id,
    idLibreria: req.session.idLibreria
  });


  //Guarda el nuevo usuario en la base de datos
  const savedBook = await nuevoLibro.save();

  console.log(savedBook);
  console.log(req.session);

  res.redirect(`/libro/admin/views/${savedBook._id}`);

}

exports.HTMLView = async (req, res) => {
  try {
    res.sendFile('libro.html', {
      root: 'public'
    });
  } catch (err) {
    res.json({
      message: err
    })
  }

}

exports.listarLibros = async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);

  } catch (err) {
    res.json({
      message: err
    })
  }
}

exports.listarLibro = async (req, res) => {
  try {
    const libro = await Libro.findById({
      _id: req.params.idLibro
    });
    res.json(libro);
  } catch (err) {
    res.json({
      message: err
    })
  }
}

exports.borrarLibro = async (req, res) => {
  await Libro.findByIdAndDelete(req.params.idLibro);
  res.redirect('/usuario/catalogo');
}

exports.listarLibrosNovedosos = async (req, res) => {
  try {
    const libros = await Libro.find().limit(12);
    res.json(libros);

  } catch (err) {
    res.json({
      message: err
    })
  }
}

exports.listarLibrosAutor = async (req, res) => {
  try {
    const librosAutor = await Libro.find({
      idAutor: req.params.idAutor
    });
    res.json(librosAutor);

  } catch (err) {
    res.json({
      message: err
    })
  }
}