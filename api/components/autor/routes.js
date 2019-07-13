const express = require('express'),
      router = express.Router(),
      multer = require('multer'),
      controller = require('./controller'),
      Autor = require('./model');

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

// //Listar autor
// router.get('/', async (req, res) => {
//   const autores = await Autor.find();
//   res.redirect('/public/autores.html')
// })

// // Registrar autor
 router.post('/registro', upload.single('img'), (req,res) => {
    
  controller.registrar_autor;

 });
 

module.exports = router;
