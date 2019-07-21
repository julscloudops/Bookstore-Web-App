const express = require('express'),
      router = express.Router(),
      controllerAdminGlobal = require('./controller');

router.post('/registro', controllerAdminGlobal.registrarAdminGlobal);

module.exports = router;