const bcrypt = require('bcryptjs'),
      nodemailer = require('nodemailer'),
      cloudinary = require('cloudinary'),
      adminLibreria = require('./model');

// Importa la función para generar una contraseña aleatoria
const { passwordGenerator } = require('../../utility/password-generator');
const { ageCalculator } = require('../../utility/age-calculator');


// Permite subir las imagenes a la nube
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

  
exports.registrarAdminLibreria = async (req, res) => {

//Busca que no exista otro administrador con el mismo email
const emailExist = await adminLibreria.findOne({
  email: req.body.email
});
if (emailExist) return res.status(400).send('El correo electrónico ya se encuentra registrado');

// Crea una contraseña autogenerada
let randomPass = passwordGenerator();

// Permite utilizar el correo  de parrafodigitaltest@gmail.com
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

let url = 'http://localhost:3000/admin-libreria/login';

let mailOptions = transporter.sendMail({
  from: '"Parrafo Digital" <parrafodigitaltest@gmail.com>',
  to: req.body.email,
  subject: "Email de confirmación",
  html: `Su contraseña es ${randomPass}, ingrese a este link para iniciar sesión: <a href="${url}">${url}</a>`

});

console.log(`Mensaje enviado a ${req.body.email}`);

// Hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(randomPass, salt);

// Se guarda la imagen en cloudinary y la dirección de la imagen en la base de datos
const result = await cloudinary.v2.uploader.upload(req.file.path);

//Calcula la edad de los usuarios en base a su fecha de nacimiento
let age = ageCalculator(req.body.birthDate);

//Se crea un nuevo usuario
const newAdminLibreria = new adminLibreria({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  email: req.body.email,
  phone: req.body.phone,
  birthDate: req.body.birthDate,
  age: age,
  gender: req.body.gender,
  idType: req.body.idType,
  id: req.body.id,
  provincia: req.body.provincia,
  canton: req.body.canton,
  distrito: req.body.distrito,
  direction: req.body.direction,
  imgUrl: result.url,
  cloudinary_id: result.public_id,
  password: hashedPassword
});


//Guarda el nuevo usuario en la base de datos
const savedAdminLibreria = await newAdminLibreria.save();
console.log(savedAdminLibreria);

res.send("Registro exitoso!");

}

exports.loginAdminLibreria = async (req, res) => {

//Verifica que el email ingresado sea el mismo que el guardado en la base de datos
const usuario = await adminLibreria.findOne({
    email: req.body.email
   });
if (!usuario) return res.status(400).send('El email es incorrecto');

const validPass =  await bcrypt.compare(req.body.password, usuario.password);
if (!validPass) return res.status(400).send('La contraseña es incorrecta');
  
res.redirect('/inicio.html');


}
 