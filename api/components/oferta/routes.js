const express = require('express'),
      router = express.Router(),
      multer = require('multer'),
      ofertaController = require("./controller");

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
  if (!req.session.adminLibreriaId) {
    res.redirect('http://localhost:3000/');
  } else {
    next()
  }
}


router.get('/registro', redirectIndex, ofertaController.registrarOfertaHTML);

//Registrar oferta
router.post('/registro', redirectIndex, upload.single('img'), ofertaController.registrarOferta);


//Listar oferta
router.get('/JSON/:idOferta', ofertaController.listarOferta);
router.get('/views/:idOferta', ofertaController.HTMLView);
// router.get('/admin/:idOferta', redirectIndex, ofertaController.HTMLViewAdmin);



module.exports = router;