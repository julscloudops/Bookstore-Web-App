const express = require('express'),
      router = express.Router(),
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken'),
      nodemailer = require('nodemailer'),
      User = require('../models/usuario');


// Importa las funciones para validar los datos de las rutas de registro y login
const {
  loginValidation,
  passwordGenerator
} = require('../middleware/validation');


//Iniciar sesión
router.get('/login', (req, res) => {
 res.redirect('/login.html');
});

router.post('/login', async (req, res) => {

  //Validación de email y contraseña
  const {
    error
  } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Busca que no exista otro usuario con el mismo email
  const user = await User.findOne({
    email: req.body.email
  });
  if (!user) return res.status(400).send('El email es incorrecto');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('La contraseña es incorrecta');

  res.redirect('/inicio.html');
  res.send('Inicio de sesión exitoso!');

  // Crea y asigna un token
  const token = jwt.sign({
    _id: User._id
  }, process.env.JWT_SECRET);
  res.header('auth-token', token);
});

//Registro
router.get('/registro', (req, res) => {
  res.redirect('registro-usuario.html')
});

router.post('/registro', async (req, res) => {

  //   //Se valida el correo electrónico antes de ingresarlo a la base de datos
  // const {error} = registerValidation(req.body);
  // if(error) return res.status(400).send(error.details[0].message);

  //Busca que no exista otro usuario con el mismo email
  const emailExist = await User.findOne({
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
  const newUser = new User({
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

  // Guarda el nuevo usuario en la base de datos
  const savedUser = await newUser.save();
 
  res.send(res.redirect('/registro-exitoso.html'));


});







// router.delete('/:idUsuario', (req, res, next) => {
//   User.remove({
//       _id: req.params.idUsuario
//     })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: 'Usuario eliminado'
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

module.exports = router;