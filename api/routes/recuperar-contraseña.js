// const express = require('express'),
//       router = express.Router(),
//       bcrypt = require('bcrypt'),
//       nodemailer = require('nodemailer'),
//       User = require('../models/usuario');

//       const {passwordGenerator} = require('../middleware/validation');
      
      

// app.post('/recuperar-contraseña', (req, res) => {

//   passwordGenerator();
//   // Permite utilizar el correo parrafodigitaltest
//   let transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: process.env.GMAIL_USER,
//       pass: process.env.GMAIL_PASS
//     }
//   });

//   let url = 'http://localhost:3000/usuario/login';

//   let mailOptions = transporter.sendMail({
//     from: '"Parrafo Digital" <parrafodigitaltest@gmail.com>',
//     to: req.body.email,
//     subject: "Email de confirmación",
//     // text: `Su contraseña es ${randomPass}`,
//     html: `Su contraseña es ${randomPass}, ingrese a este link para iniciar sesión: <a href="${url}">${url}</a>`
// });
