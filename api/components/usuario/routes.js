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


// const cambiarContraseña = (req, res, next) => {

// }

const redirectLogin = (req, res, next) => {
  if(!req.session.userId) {
    res.redirect('http://localhost:3000/usuario/login');
  } else {
    next()
  }
}

const redirectHome = (req, res, next) => {
  if(req.session.userId) {
    res.redirect('http://localhost:3000/usuario/inicio');
  } else {
    next()
  }
}


// Registrar usuario
router.post('/registro', redirectHome, upload.single('img'), usuarioController.registrarUsuario);

//Inicio de sesión usuario
router.post('/login', usuarioController.loginUsuario);

router.get('/registro', redirectHome, (req, res) => {
  res.sendFile('registro-usuario.html', {root: 'public'}); 

})

router.get('/login', redirectHome, (req, res) => {
  res.sendFile('login.html', {root: 'public'}); 
});

router.get('/perfil', redirectLogin, (req, res) => {
  res.sendFile('perfil-usuario.html', {root: 'public'}); 
});

router.get('/perfil/id', usuarioController.visualizarPerfil);

//La ruta hacia la página de inicio
router.get('/inicio', redirectLogin, (req, res) => {
  res.sendFile('inicio.html', {root: 'public'}); 

});

//La ruta hacia la página de catalogo
router.get('/catalogo', redirectLogin, (req, res) => {
  res.sendFile('catalogo.html', {root: 'public'}); 
})


// Cerrar sesión
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
  res.redirect(200, 'http://localhost:3000/')
  });

});
  
  
module.exports = router;