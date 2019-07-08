const express = require('express'),
      router = express.Router(),
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken'),
      nodemailer = require('nodemailer'),
      adminLibreria = require('../models/admin-libreria');

const { passwordGenerator } = require('../middleware/validation');
      
      
//Registro

router.post('/registro', async (req, res) => {

//Busca que no exista otro usuario con el mismo email
  const emailExist = await adminLibreria.findOne({
    email: req.body.email
  });
  if (emailExist) return res.status(400).send('El correo electrónico ya se encuentra registrado');

// Crea una contraseña autogenerada
 let randomPass = passwordGenerator();

  // Permite utilizar el correo parrafodigitaltest
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  let url = 'http://localhost:3000/usuario/login';

  let mailOptions = transporter.sendMail({
    from: '"Parrafo Digital" <parrafodigitaltest@gmail.com>',
    to: req.body.email,
    subject: "Email de confirmación",
    // text: `Su contraseña es ${randomPass}`,
    html: `Su contraseña es ${randomPass}, ingrese a este link para iniciar sesión: <a href="${url}">${url}</a>`

  });

  console.log(`Mensaje enviado a ${req.body.email}`);

// Hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(randomPass, salt);

  //Se crea un nuevo usuario
  const newAdminLibreria = new adminLibreria({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    birthDate: req.body.birthDate,
    gender: req.body.gender,
    idType: req.body.idType,
    id: req.body.id,
    provincia: req.body.provincia,
    canton: req.body.canton,
    distrito: req.body.distrito,
    direction: req.body.location,
    password: hashedPassword
  });

  // Nos muestra los contenidos del post request que se hace al servidor
  console.log(req.body);

  // Guarda el nuevo administrador en la base de datos
  const savedAdminLibreria = await newAdminLibreria.save();
 
  res.send(res.redirect('/registro-exitoso.html'));

});





module.exports = router;