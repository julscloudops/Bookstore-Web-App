const express = require('express'),
      router = express.Router(),
      multer = require('multer'),
      adminLibreriaController = require('./controller');

// //  Importación de funciones de passport.js para proteger ciertas rutas     
// const { ensureAuthenticated, forwardAuthenticated } = require('../../middleware/checkAuth');
     
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

//Inicio de sesión para administrador de libreria
router.post('/login', adminLibreriaController.loginAdminLibreria);

router.get('/login', (req, res) => {
  res.redirect('/login.html');
});

//Registrar usuario
router.post('/registro', upload.single("img"), adminLibreriaController.loginAdminLibreria);

module.exports = router;