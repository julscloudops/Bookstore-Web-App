const express = require('express'),
      router = express.Router(),
      multer = require('multer'),
      libroController = require('./controller');

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

const redirectIndex = (req, res, next) => {
    if(!req.session.idAdminLibreria) {
      res.redirect('http://localhost:3000/landing-page');
    } else {
      next()
    }
  }

  const redirectAdminPagLibro = (req, res, next) => {
    if(req.session.idAdminLibreria) {
      res.sendFile('libro-adminLibreria.html', {
        root: 'public'
      });
    } else {
      next()
    }
  }



router.get('/registroHTML', (req, res) => {
  res.sendFile('registro-libro.html', {
    root: 'public'
  });
});

//Registrar libro
router.post('/registro', upload.single('img'), libroController.registrarLibro);
//Listar libros
router.get('/', libroController.listarLibros);
router.get('/JSON/:idLibro', libroController.listarLibro);
router.delete('/delete/:idLibro', libroController.borrarLibro);
router.get('/views/:idLibro', redirectAdminPagLibro, libroController.HTMLView);

router.get('/librosNovedosos', libroController.listarLibrosNovedosos);

router.get('/librosAutor/:idAutor', libroController.listarLibrosAutor);


module.exports = router;

