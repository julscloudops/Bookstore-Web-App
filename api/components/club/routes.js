const express = require('express'),
  router = express.Router(),
  multer = require('multer'),
  clubController = require('./controller');

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

const redirectRegistroAdmin = (req, res, next) => {
  if (req.session.idAdminLibreria) {
    res.sendFile('registro-club-adminLibreria.html', {
      root: 'public'
    });
  } else {
    next()
  }
}

const redirectAdminPagClub = (req, res, next) => {
  if(req.session.idAdminLibreria) {
    res.sendFile('club-adminLibreria.html', {
      root: 'public'
    });
  } else {
    next()
  }
}


//Registro club de lectura
router.post('/registro', upload.single('img'), clubController.registrarClub);

router.get('/registroHTML', redirectRegistroAdmin, (req, res) => {
  res.sendFile('registro-club.html', {
    root: 'public'
  });
});

//Página clubes
router.get('/listarHTML', (req, res) => {
  res.sendFile('clubes.html', {
    root: 'public'
  });
});



//Página club
router.get('/views', redirectAdminPagClub,  (req, res) => {
  res.sendFile('club.html', {
    root: 'public'
  });
});

router.get('/JSON/:idClub', clubController.listarClub);



module.exports = router;