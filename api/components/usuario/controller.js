const bcrypt = require('bcrypt'),
  nodemailer = require('nodemailer'),
  cloudinary = require('cloudinary'),
  User = require('./model');

// Importa la función para generar una contraseña aleatoria
const {
  passwordGenerator
} = require('../../utility/password-generator');
const {
  ageCalculator
} = require('../../utility/age-calculator');

exports.registrarUsuario = async (req, res) => {

  //Busca que no exista otro usuario con el mismo email
  const emailExist = await User.findOne({
    email: req.body.email
  });
  if (emailExist) return res.redirect('/usuario/login')

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
    html: `Su contraseña autogenerada es ${randomPass}, ingrese a este link para concluir el proceso de autentificación: <a href="${url}">${url}</a>`

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
  const newUser = new User({
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
    description: req.body.description,
    imgUrl: result.url,
    cloudinary_id: result.public_id,
    password: hashedPassword
  });

  //Guarda el nuevo usuario en la base de datos
  const savedUser = await newUser.save();
  console.log(savedUser);

  res.sendFile('registro-exitoso.html', {
    root: 'public'
  });

}


exports.registrarAdminLibreria = async (req, res) => {
  //Busca que no exista otro usuario con el mismo email
  const emailExist = await User.findOne({
    email: req.body.email
  });
  if (emailExist) return res.redirect('/usuario/registro/admin-libreria')

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

  //Calcula la edad de los usuarios en base a su fecha de nacimiento
  let age = ageCalculator(req.body.birthDate);

  //Se crea un nuevo usuario
  const newAdminLibreria = new User({
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
    description: req.body.description,
    imgUrl: result.url,
    cloudinary_id: result.public_id,
    password: hashedPassword,
    isAdminLibreria: true
  });

  //Guarda el nuevo usuario en la base de datos
  const savedAdminLibreria = await newAdminLibreria.save();
  console.log(savedAdminLibreria);

  res.sendFile('registro-exitoso.html', {
    root: 'public'
  });
}

//Inicio de sesión para todos los usuarios
exports.loginUsuario = async (req, res) => {

  console.log(req.body.email);
  console.log(req.body.password);
  

  //Verifica que el email ingresado sea el mismo que el guardado en la base de datos
  const usuario = await User.findOne({
    email: req.body.email
  });
  if (!usuario) {
    return res.redirect('/usuario/login')
  }
  // const validPass = await bcrypt.compare(req.body.password, usuario.password);
  // if (!validPass) {
  //   return res.redirect('/usuario/login')
  // }

  req.session.tempId = usuario._id;

  if (usuario.isVerified === false) {
    return res.sendFile('password-change.html', {
      root: 'public'
    })
  }

  if (usuario.isAdminLibreria === true) {
    req.session.adminLibreriaId = usuario._id;
    console.log(req.session);
    res.sendFile('inicio-adminLibreria.html', {
      root: 'public'
    });
  } else {
    console.log(req.session);
    res.sendFile('inicio.html', {
      root: 'public'
    });

  }
}

exports.changePassword = async (req, res) => {

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newPass, salt);

  //Se guarda la nueva contraseña y el valor de isVerified pasa a true para permitirle al usuario ingresar a la aplicación
  const usuario = await User.findOneAndUpdate({_id: req.session.tempId},
    {$set:{password: hashedPassword, isVerified: true}}, {returnNewDocument: true});
    console.log(usuario);
    
    res.json('Cambio de contraseña exitoso!');

  }


exports.visualizarPerfil = async (req, res) => {

  //Muestra el id del usuario guardado en el cookie
  console.log(req.session.idUsuario)

  try {
    const usuario = await User.findById({
      _id: req.session.idUsuario
    });
    res.json(usuario);

  } catch (err) {
    res.json({
      message: err
    })
  }

}

exports.HTMLViewPerfilUsuarios = (req, res) => {
  res.sendFile('página-usuario.html', {
    root: 'public'
  })
};

exports.listarUsuario = async (req, res) => {
  try {
    const usuario = await User.findById({
      _id: req.params.idUsuario
    });
    res.json(usuario);
  } catch (err) {
    res.json({
      message: err
    })
  }

};