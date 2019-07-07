const express = require('express'),
      router = express.Router(),
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken'),
      nodemailer = require('nodemailer'),
      User = require('../models/usuario');


// Importa las funciones para validar los datos de las rutas de registro y login
const {registerValidation, loginValidation, passwordGenerator} = require('../middleware/validation');










// //Iniciar sesión
// router.get('/login', (req, res) => {
//  res.redirect('/login.html');
// });


router.post('/login', async (req, res) => {

//Validación de email y contraseña
const {error} = loginValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);

//Busca que no exista otro usuario con el mismo email
const emailExist = await User.findOne({email: req.body.email});
if(!emailExist) return res.status(400).send('El email es incorrecto');

const validPass = await bcrypt.compare(req.body.password, User.password);
if(!validPass) return res.status(400).send('La contraseña es incorrecta');

res.redirect('/inicio.html');
res.send('Inicio de sesión exitoso!');

// Crea y asigna un token
const token = jwt.sign({_id: User._id}, process.env.JWT_SECRET);
res.header('auth-token', token);
});

//Registro
router.get('/registro', (req, res) => {
  res.redirect('registro-usuario.html')
});

router.post('/registro', async (req, res) => {

//   //Se valida el correo electrónico antes de ingresarlo a la base de datos
// const {error} = registerValidation(req.body);
//   if(error) return res.status(400).send(error.details[0].message);

//Busca que no exista otro usuario con el mismo email
const emailExist = await User.findOne({email: req.body.email});
if(emailExist) return res.status(400).send('El correo electrónico ya se encuentra registrado');

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
  });


// Nos muestra los contenidos del post request que se hace al servidor
console.log(req.body);


// Guarda el nuevo usuario en la base de datos
const savedUser = await newUser.save();


// Permite utilizar el correo parrafodigitaltest
let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER, 
      pass: process.env.GMAIL_PASS
    }
  });


let mailOptions = transporter.sendMail({
          from: '"Parrafo Digital" <parrafodigitaltest@gmail.com>', 
          to: req.body.email, 
          subject: "Email de comfirmación", 
          text: "Esta es su contraseña autogenerada", 
          html: `Ingrese a este link para confirmar su correo electrónico: <a href=""></a>` 
   
        });
    
console.log(`Mensaje enviado a ${req.body.email}`);
res.send(res.redirect('/registro-exitoso.html'));


      });


  // newUser.save().then(user => {
  //     // res.redirect();
  //     res.json({message: "Por favor ingrese a su correo electrónico."})
  // });

//   let errors = [];
// //Verifica que no exista otro usuario con el mismo correo electrónico 
//   User.find({email: email})
//   .then(user => {
//     if(user){
//       errors.push({msg: 'El correo electrónico ya se encuentra registrado'});
//  res.redirect('/registro-usuario.html');
//     } else {
//      
//   })
//   .catch(err => console.log(err));
//     }
//   })
  




// // Registro
// router.post('/registro', (req, res, next) => {
//   User.find({
//       email: req.body.email
//     })
//     .exec()
//     .then(user => {
//       if (user.length >= 1) {
//         return res.status(409).json({
//           message: 'El correo electrónico ingresado ya se encuentra registrado en la aplicación'
//         });
//       } else {
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//           if (err) {
//             return res.status(500).json({
//               error: err
//             });
//           } else {
//             const user = new User({
//               _id: mongoose.Types.ObjectId(),
//               email: req.body.email,
//               password: hash
//             });
//             user.save()
//               .then(result => {
//                 res.status(201).json({
//                   message: 'Usuario creado'
//                 });
//               })
//               .catch(err => {
//                 console.log(err);
//                 res.status(500).json({
//                   error: err
//                 });
//               });
//           }
//         });
//       }
//     })
// });



// // Iniciar Sesión
// router.post('/iniciar-sesion', (req, res, next) => {
//   User.find({
//       email: req.body.email
//     })
//     .exec()
//     .then(user => {
//       if (user.length < 1) {
//         return res.status(401).json({
//           message: 'El proceso de autentificación tuvo un fallo'
//         });
//       }
//       bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//         if (err) {
//           return res.status(401).json({
//             message: 'El proceso de autentificación tuvo un fallo'
//           });
//         }
//         if (result) {
//           const token = jwt.sign({

//               email: user[0].email,
//               idUsuario: user[0]._id

//             },
//             process.env.JWT_KEY, {
//               expiresIn: "1h"
//             }
//           );
//           return res.status(200).json({
//             message: 'El proceso de autentificación fue exitoso!',
//             token: token
//           });
//         }
//         return res.status(401).json({
//           message: 'El proceso de autentificación tuvo un fallo'
//         });
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       })
//     });
// });





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