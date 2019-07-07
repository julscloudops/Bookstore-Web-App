const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const nodemailer = require('package');

const adminLibreria = require('../models/admin-libreria');

// Registro
router.post('/', (req, res, next) => {
  adminLibreria.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'El correo electrónico ingresado ya se encuentra registrado en la aplicación'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user.save()
              .then(result => {
                res.status(201).json({
                  message: 'Usuario creado'
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    })
});

// app.post('/', (req, res, next) => {
//   delete req.body._id;
//   db.collection('administradores-libreria').insertOne(req.body)});


// applicationCache.post('/confimation', userController.confirmationPost);
// app.post('/resend', userController.resendTokenPost);


router.post('/nuevo', (req, res) => {
  console.log(req.body);
  res.send('Ok');
})


module.exports = router;