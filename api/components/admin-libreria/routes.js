const express = require('express'),
      router = express.Router(),
      apiAdminLibreria = require('./api');
       
//Registro
router.post('/registro', (req, res) => {

apiAdminLibreria.registrarAdminLibreria(req, res);

});

module.exports = router;