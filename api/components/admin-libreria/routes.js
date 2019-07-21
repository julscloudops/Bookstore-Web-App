const express = require('express'),
      router = express.Router(),
      multer = require('multer'),
      adminLibreriaController = require('./controller');

//  Importación de funciones de passport.js para proteger ciertas rutas     
// const { checkAuthenticated, checkNotAuthenticated } = require('../../utility/checkAuth');
     
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

const redirectLogin = (req, res, next) => {
  if(!req.session.adminLibreriaId) {
    res.redirect('http://localhost:3000/admin-libreria/login');
  } else {
    next()
  }
}

const redirectHome = (req, res, next) => {
  if(req.session.adminLibreriaId) {
    res.redirect('http://localhost:3000/admin-libreria/inicio');
  } else {
    next()
  }
}

//Registrar admin libreria
router.get('/registro', redirectHome, (req, res) => {
  res.sendFile('registro-admin-libreria.html', {root: 'public'}); 
});

router.post('/registro', upload.single('img'), adminLibreriaController.registrarAdminLibreria);

//Inicio de sesión para administrador de libreria
router.get('/login', redirectHome, (req, res) => {
  res.sendFile('login.html', {root: 'public'}); 
});

router.post('/login', adminLibreriaController.loginAdminLibreria);

router.get('/inicio', redirectLogin, (req, res) => {
  res.sendFile('inicio-adminLibreria.html', {root: 'public'}); 
});


module.exports = router;