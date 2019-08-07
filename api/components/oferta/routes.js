const express = require('express'),
      router = express.Router(),
      multer = require('multer'),
      ofertaController = require('./controller');

//Settings de Multer, permite subir imagenes a la página
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + new Date().toISOString());
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

const redirectIndex = (req, res, next) => {
  if (!req.session.idAdminLibreria) {
    res.redirect('http://localhost:3000/landing-page');
  } else {
    next()
  }
}

const redirectAdminPagOferta = (req, res, next) => {
  if(req.session.idAdminLibreria) {
    res.sendFile('oferta-adminLibreria.html', {
      root: 'public'
    });
  } else {
    next()
  }
}


router.get('/', ofertaController.listarOfertas);

router.get('/registroHTML',  ofertaController.registrarOfertaHTML);

//Registrar oferta
router.post('/registro', upload.single('img'), ofertaController.registrarOferta);


//Listar oferta
router.get('/JSON/:idOferta', ofertaController.listarOferta);
router.get('/views/:idOferta', redirectAdminPagOferta,  ofertaController.HTMLView);
router.get('/ofertasNovedosas', ofertaController.listarOfertasNovedosas);

// router.get('/admin/:idOferta', redirectIndex, ofertaController.HTMLViewAdmin);



module.exports = router;