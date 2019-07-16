const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      multer = require('multer'),
      usuarioController = require('./controller');

//  Importación de funciones de passport.js para proteger ciertas rutas     
const { checkAuthenticated, checkNotAuthenticated } = require('../../utility/checkAuth');
     
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

// Registrar usuario
router.post('/registro', upload.single('img'), usuarioController.registrarUsuario);

router.get('/registro', (req, res) => {
  res.redirect('http://localhost:3000/registro-usuario.html');
})

//Inicio de sesión usuario
router.post('/login', passport.authenticate('local-login'), (req, res) => {
  res.redirect('http://localhost:3000/inicio.html');
}
);

router.get('/login', (req, res) => {
  res.redirect('http://localhost:3000/login.html');
});

// router.get('/perfil', usuarioController.visualizarPerfil);


router.get('/inicio', (req, res) => {
res.redirect('http://localhost:3000/inicio.html');

});



//Cerrar sesión
// router.delete('/logout', (req, res) => {
//   req.logOut();
//   res.redirect('/usuario/login');
// });


module.exports = router;