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

const redirectAdminPagAutor = (req, res, next) => {
  if(req.session.idAdminLibreria) {
    res.sendFile('autor-adminLibreria.html', {
      root: 'public'
    });
  } else {
    next()
  }
}



router.get('/registroHTML', (req, res) => {
  res.sendFile('registro-autor.html', {
    root: 'public'
  });
});


const redirectIndex = (req, res, next) => {
  if(!req.session.idAdminLibreria) {
    res.redirect('http://localhost:3000/landing-page');
  } else {
    next()
  }
}

// Registrar autor
 router.post('/registro', upload.single('img'), autorController.registrarAutor);

 // Listar autores
 router.get('/', autorController.listarAutores);

 router.get('/listar', autorController.listarAutoresHTML);


// Listar autor
 router.get('/views/:idAutor', redirectAdminPagAutor, autorController.HTMLView);

 router.get('/JSON/:idAutor', autorController.listarAutor);

 router.delete('/delete/:idAutor', autorController.borrarAutor);



module.exports = router;
