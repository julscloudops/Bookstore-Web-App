const express = require('express'),
      router = express.Router(),
      bcrypt = require('bcrypt'),
      nodemailer = require('nodemailer'),
      adminGlobal = require('./model');

router.post('/registro', async (req, res) => {

  const nuevoAdminGlobal = new adminGlobal({
          firstName: {type: String},
          lastName: {type: String},
          email: { type: String, required: true, unique: true},        
          password: {type: String}
  })

  const savedAdminGlobal = await nuevoAdminGlobal.save();
  res.json(savedAdminGlobal);
    });

module.exports = router;