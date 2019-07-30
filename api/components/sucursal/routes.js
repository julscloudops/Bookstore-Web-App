const express = require('express'),
      router = express.Router(),
      multer =  require('multer'),
      sucursalController = require('./controller');


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
  res.sendFile('registro-sucursal.html', {
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

//Registro sucursal
 router.post('/registro', upload.single('img'), sucursalController.registrarSucursal);
 
//Listar sucursales
// router.get('/', sucursalController.listarSucursales);

//Listar sucursal

router.get('/JSON/:idSucursal', sucursalController.listarSucursal);
router.get('/views/:idSucursal', sucursalController.HTMLView);
router.get('/admin/:idSucursal', sucursalController.HTMLViewAdmin);


// router.get('admin/views/:idSucursal', redirectIndex, sucursalController.HTMLViewAdmin);

      
module.exports = router;
