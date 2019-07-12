const express = require('express'),
      router = express.Router(),
      bcrypt = require('bcrypt'),
      nodemailer = require('nodemailer'),
      apiUsuario = require('./api');


//Listar usuarios
router.get('/', async (req, res) => {

})


// router.get('/inicio', async (req, res) => {
// res.sendFile('public/inicio.html', {root: './'});

// // })

//Iniciar sesión
router.get('/login', (req, res) => {
res.sendFile('public/login.html', {root: './'});
})

router.post('/login', async (req, res) => {
 
  //Busca que no exista otro usuario con el mismo email
  const user = await User.findOne({
    email: req.body.email
  });

  if (!user) return res.status(400).send('El email es incorrecto');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('La contraseña es incorrecta');
  
res.sendFile('public/inicio.html', {root: './'});

});


// router.get('/registro', async (req, res) => {
// res.redirect('registro-usuario.html');
// });

//Registrar usuario
router.post('/registro', (req, res) => {
  
  apiUsuario.registrarUsuario(req, res);

});

module.exports = router;