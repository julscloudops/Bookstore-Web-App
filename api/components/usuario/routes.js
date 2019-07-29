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

const redirectLoginAdmin = (req, res, next) => {
  if(!req.session.adminLibreriaId) {
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

const redirectHomeAdmin = (req, res, next) => {
  if(req.session.adminLibreriaId) {
    res.sendFile('inicio-adminLibreria.html', {root: 'public'});
  } else {
    next()
  }
}


// Registrar administrador de libreria
router.get('/registro/admin-libreria', (req, res) => {
  res.sendFile('registro-admin-libreria.html', {root: 'public'}); 
});

router.post('/registro/admin-libreria', upload.single('img'), usuarioController.registrarAdminLibreria);

// Registrar usuario
router.get('/registro', (req, res) => {
  res.sendFile('registro-usuario.html', {root: 'public'}); 
})

router.post('/registro', upload.single('img'), usuarioController.registrarUsuario);

//Inicio de sesión usuario
router.get('/login', (req, res) => {
  res.sendFile('login.html', {root: 'public'}); 
});
router.post('/login', usuarioController.loginUsuario);

router.put('/change-password', usuarioController.changePassword);


router.get('/perfil', (req, res) => {
  res.sendFile('perfil-usuario.html', {root: 'public'}); 
});

router.get('/perfil/id', usuarioController.visualizarPerfil);

router.get('/views/:idUsuario', usuarioController.HTMLViewPerfilUsuarios);

router.get('/JSON/:idUsuario', usuarioController.listarUsuario);

router.get('/inicio', redirectHomeAdmin, (req, res) => {
  res.sendFile('inicio.html', {root: 'public'}); 

});

router.get('/catalogo', (req, res) => {
  res.sendFile('catalogo.html', {root: 'public'}); 
});

router.get('/carrito', (req, res) => {
  // let libroId = req.params.id;
    res.sendFile('shopping-cart.html', {root: 'public'}); 
});

// Cerrar sesión
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
  res.redirect(200, 'http://localhost:3000/')
  });
});
  
module.exports = router;