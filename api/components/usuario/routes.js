const express = require('express'),
      router = express.Router(),
      multer = require('multer'),
      usuarioController = require('./controller');

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
  fileFilter: fileFilter
});



//Inicio de sesión usuario
router.post('/login', usuarioController.loginUsuario);

//Registrar usuario
router.post('/registro', upload.single("img"), usuarioController.registrarUsuario);

module.exports = router;