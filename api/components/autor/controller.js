const cloudinary = require('cloudinary'),
  Autor = require('./model');

//Registrar autor
exports.registrarAutor = async (req, res) => {

  const nameExists = await Autor.findOne({
    name: req.body.name
  });
  if (nameExists) return res.status(400).send('Ya se encuentra un autor registrado con ese nombre');


  // Se guarda la imagen en cloudinary y la dirección de la imagen en la base de datos
  const result = await cloudinary.v2.uploader.upload(req.file.path);

  const newAuthor = new Autor({
    name: req.body.name,
    description: req.body.description,
    imgUrl: result.url,
    cloudinary_id: result.public_id
  });

  try {
    const savedAuthor = await newAuthor.save(); 
    res.redirect(`/autor/views/${savedAuthor._id}`) } 
    catch (err) {
    res.json({
      message: err
    });
  }

}

exports.HTMLView = async (req, res) => {
  try {
    res.sendFile('autor.html', {
      root: 'public'
    });
  } catch (err) {
    res.json({
      message: err
    })
  }

}

exports.listarAutores = async (req, res) => {
  try {
    const autores = await Autor.find();
    res.json(autores);
    
  } catch (err) {
    res.json({
      message: err
    })
  }
}

exports.listarAutoresHTML = async (req, res) => {
  try {
    res.sendFile('autores.html', {
      root: 'public'
    });
  } catch (err) {
    res.json({
      message: err
    })
  }
}


exports.listarAutor = async (req, res) => {
  try {
    const autor = await Autor.findById({
      _id: req.params.idAutor
    });
    res.json(autor);
  } catch(err){
    res.json({
      message: err
    })
  }
}

exports.borrarAutor = async (req, res) => {
 await Autor.findByIdAndDelete(req.params.idAutor);
  res.redirect('/autor/listar');
}
