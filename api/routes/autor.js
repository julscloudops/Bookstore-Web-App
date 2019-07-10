const express = require('express'),
      router = express.Router(),
      multer = require('multer');
      Autor = require('../models/autor');

//Settings de Multer, permite subir imagenes a la página
const storage = multer.diskStorage({
  destination: function(req, file, cb){
  cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null,file.fieldname + '-' + new Date().toISOString());
  }
});

const upload = multer({
storage: storage,
limits: {
fileSize: 100000
}
});

router.get('/', async (req, res) => {
  res.sendFile('public/registro-autor.html', {root: './'});
  
  // res.json({message: 'Hola'});
});


// Registrar autor
router.post('/registro', upload.single('authorImg'), async (req, res) => {
  
  //Muestra el objeto que crea Multer para guardar la imagen
  console.log(req.file.path);

  const newAuthor = await new Autor({
    authorName: req.body.authorName,
    description: req.body.description,
    authorImg: req.file.path
  });
  try {
    const savedAuthor = await newAuthor.save();
    res.json(savedAuthor);
  } catch (err) {
    res.status(400).send(err);

  }

});


module.exports = router;
