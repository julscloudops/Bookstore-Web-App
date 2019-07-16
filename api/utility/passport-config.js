const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../components/usuario/model');

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   const user = await User.findById(id);
//   done(null, user);
// });

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, async (req, email, done) => {
  const user = await User.findOne({
    'email': email
  })
  console.log(user)
  if (user) {
    return done(null, false, req.flash('registerMessage', 'El correo electrónico ingresado ya se encuentra registrado'));
  } else {
    const newUser = new User();
    newUser.email = email;
    console.log(newUser)
    await newUser.save();
    done(null, newUser);
  }
}));

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({
    email: email
  });   
  if (!user) {
    return done(null, false, ({message: 'El email es incorrecto'}));
  } 
  const validPass = await bcrypt.compare(req.body.password, user.password);
  console.log(validPass);
  if (!validPass) {
    return done(null, false, ({message: 'La contraseña es incorrecta'}));
  }
  return done(null, user);
  

}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async(id, done) => {
  await User.findById({_id: id}, (err, user) => {
    done(err, user);
  });
});







// // //Verifica que el email ingresado sea el mismo que el guardado en la base de datos
// // const usuario = await User.findOne({
// //     email: req.body.email
// //    });
// // if (!usuario) return res.status(400).send('El email es incorrecto');

// // const validPass =  await bcrypt.compare(req.body.password, usuario.password);
// // if (!validPass) return res.status(400).send('La contraseña es incorrecta');