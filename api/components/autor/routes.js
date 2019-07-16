const express = require('express'),
      router = express.Router(),
      multer = require('multer'),
      autorController = require('./controller');

//Settings de Multer, permite subir imagenes a la página
const storage = multer.diskStorage({
  destination: function(req, file, cb){
  cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null,file.fieldname + '-' + new Date().toISOString());
  }
});

const fileFilter = (req, file, cb) => {
if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
  cb(null, true);
} else {
  cb(null, false);
}};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10000000
  }
});

// // Registrar autor
 router.post('/registro', upload.single('img'), autorController.registrarAutor);

 //Listar autores
 router.get('/', autorController.listarAutores);

module.exports = router;
