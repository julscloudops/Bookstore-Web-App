const bcrypt = require('bcrypt'),
      nodemailer = require('nodemailer'),
      adminGlobal = require('./model');

// Importa la función para generar una contraseña aleatoria
const { passwordGenerator } = require('../../utility/password-generator');

exports.registrarAdminGlobal = async (req, res) => {

//Busca que no exista otro administrador con el mismo email
const emailExist = await adminGlobal.findOne({
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

let url = 'http://localhost:3000/admin-global/login';

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

    //Se crea un nuevo administrador global
  const nuevoAdminGlobal = new adminGlobal({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  email: req.body.email,
  phone: req.body.phone,
  password: hashedPassword
});

const savedAdminGlobal = await nuevoAdminGlobal.save();

console.log(savedAdminGlobal);
res.json('El registro de administrador global fue exitoso!');

}