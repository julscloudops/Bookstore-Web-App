const express = require('express'),
  router = express.Router(),
  multer = require('multer');
  bcrypt = require('bcrypt'),
  nodemailer = require('nodemailer'),
  User = require('../models/usuario');

// Importa las funciones para validar los datos de las rutas de registro y login
const {
  loginValidation,
  passwordGenerator
} = require('../middleware/validation');


//Settings de Multer, permite subir imagenes a la página
const storage = multer.diskStorage({
  destination: function(req, file, cb){
  cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null,file.fieldname + '-' + new Date().toISOString());
  }
});

const upload = multer({
storage: storage,
limits: {
fileSize: 100000
}
});


router.get('/', async (req, res) => {

})

router.get('/inicio', async (req, res) => {
res.sendFile('public/inicio.html', {root: './'});

})

//Iniciar sesión
router.get('/login', (req, res) => {
res.sendFile('public/login.html', {root: './'});
})

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
  
res.sendFile('public/inicio.html', {root: './'});

});


router.get('/registro', async (req, res) => {
res.redirect('/public/registro-usuario.html');
})

//Registrar usuario
router.post('/registro', upload.single('avatar'), async (req, res) => {
  console.log(req);
  console.log(req.file.path);

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
    avatar: req.file.path,
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

  try {
    //Guarda el nuevo usuario en la base de datos
    const savedUser = await newUser.save();

    // Nos muestra los contenidos del post request que se hace al servidor
    console.log(savedUser);
    res.sendFile('public/registro-exitoso.html', {root: './'});

  } catch (err) {
    res.status(400).send(err);

  }


});

module.exports = router;