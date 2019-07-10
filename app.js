const express = require('express'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      app = express();

//Configuración
app.set('port', process.env.PORT || 8080);

//Inicialización del servidor
app.listen(app.get('port'), () => {
  console.log('El servidor esta corriendo en el puerto', app.get('port'));
});

// Muestra en consola los HTTP requests que se hacen al servidor
app.use(morgan('dev'));

// Permite utilizar environment variables para guardar la contraseña de la base de datos
const dotenv = require('dotenv');
dotenv.config();

//Conecta la aplicación con la base de datos
mongoose.connect('mongodb+srv://' + process.env.MONGO_ATLAS_USER + ':' + process.env.MONGO_ATLAS_PW + '@palo-mango-solutions-abqxf.gcp.mongodb.net/Parrafo-Digital?retryWrites=true&w=majority', {
    useNewUrlParser: true
  },
  () => {
    console.log('La base de datos fue conectada exitosamente!')
  });

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);


//Se encarga de los errores CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({
      message: 'It works!'
    });
  }
  next();
});


//Middleware and Body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Establecer la ruta para archivos estáticos
app.use(express.static('public'));

// Importación de las rutas
const adminGlobal = require('./api/routes/admin-global');
const adminLibreria = require('./api/routes/admin-libreria');
const usuario = require('./api/routes/usuario');
// const libros = require('./api/routes/libros');
const libreria = require('./api/routes/libreria');
const sucursal = require('./api/routes/sucursal');
const autor = require('./api/routes/autor');


//Rutas 
app.use('/admin-global', adminGlobal);
app.use('/usuario', usuario);
app.use('/admin-libreria', adminLibreria);
// app.use('/libros', libros);
app.use('/libreria', libreria);
app.use('/sucursal', sucursal);
app.use('/autor', autor);



// // Salir sesión
// app.get('/logout', function(req, res, next) {
//   if (req.session) {
//     // Elimina el cookie de la sesión
//     req.session.destroy(function(err) {
//       if(err) {
//         return next(err);
//       } else {
//         return res.redirect('/index.html');
//       }
//     });
//   }
// });



module.exports = app;



