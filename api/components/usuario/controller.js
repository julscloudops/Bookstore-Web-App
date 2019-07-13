const cloudinary = require('cloudinary');
      bcrypt = require('bcrypt'),
      nodemailer = require('nodemailer'),
      User = require('./model');

// Importa la función para generar una contraseña aleatoria
const {passwordGenerator} = require('../../middleware/password-generator');

// Permite subir las imagenes a la nube
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

  
exports.registrarUsuario = async (req, res) => {

  console.log(req.file);
  console.log(req.body);

//Busca que no exista otro usuario con el mismo email
const emailExist = await User.findOne({
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

let url = 'http://localhost:3000/usuario/login';

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
  direction: req.body.direction,
  imgUrl: result.url,
  cloudinary_id: result.public_id,
  password: hashedPassword
});


//Guarda el nuevo usuario en la base de datos
const savedUser = await newUser.save();
console.log(savedUser);

res.send("Registro exitoso!");

}

exports.loginUsuario = (req, res) => {
   //Busca que no exista otro usuario con el mismo email
   const usuario = User.findOne({
    email: req.body.email
   });

  if (!usuario) return res.status(400).send('El email es incorrecto');

  const validPass = bcrypt.compare(req.body.password, usuario.password);
  if (!validPass) return res.status(400).send('La contraseña es incorrecta');
  
res.redirect('/inicio.html');


}
 