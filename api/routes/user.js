const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Permite utilizar environment variables 
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user');

// Registro
router.post('/registro', (req, res, next) => {
  User.find({
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



// Iniciar Sesión
router.post('/iniciar-sesion', (req, res, next) => {
  User.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'El proceso de autentificación tuvo un fallo'
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'El proceso de autentificación tuvo un fallo'
          });
        }
        if (result) {
          const token = jwt.sign({

              email: user[0].email,
              idUsuario: user[0]._id

            },
            process.env.JWT_KEY, {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: 'El proceso de autentificación fue exitoso!',
            token: token
          });
        }
        return res.status(401).json({
          message: 'El proceso de autentificación tuvo un fallo'
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});





router.delete('/:idUsuario', (req, res, next) => {
  User.remove({
      _id: req.params.idUsuario
    })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Usuario eliminado'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;