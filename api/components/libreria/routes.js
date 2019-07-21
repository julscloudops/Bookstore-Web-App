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

router.get('/registro', (req, res) => {
  res.sendFile('registro-libreria.html', {
    root: 'public'
  });
});

const redirectIndex = (req, res, next) => {
  if(!req.session.adminLibreriaId) {
    res.redirect('http://localhost:3000/');
  } else {
    next()
  }
}

//Registro libreria
router.post('/registro', redirectIndex, upload.single('img'), libreriaController.registrarLibreria);
 
//Listar libreria
router.get('/', libreriaController.listarLibrerias);

router.get('/:idLibreria', libreriaController.listarLibreria);

module.exports = router;