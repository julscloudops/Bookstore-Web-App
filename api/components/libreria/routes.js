const express = require('express'),
      router = express.Router(),
      multer = require('multer'),
      libreriaController = require('./controller');


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

router.get('/registroHTML', (req, res) => {
  res.sendFile('registro-libreria.html', {
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

const redirectAdminPagLibreria = (req, res, next) => {
  if(req.session.idAdminLibreria) {
    res.sendFile('libreria-adminLibreria.html', {
      root: 'public'
    });
  } else {
    next()
  }
}


//Registro libreria
router.post('/registro', upload.single('img'), libreriaController.registrarLibreria);
 
//Listar librerias
router.get('/', libreriaController.listarLibrerias);
router.get('/home', libreriaController.listarLibreriasHomePage);

router.get('/listar', libreriaController.listarLibreriasHTML);


//Listar libreria
router.get('/JSON/:idLibreria', libreriaController.listarLibreria);
router.get('/views', redirectAdminPagLibreria, libreriaController.HTMLView);



module.exports = router;