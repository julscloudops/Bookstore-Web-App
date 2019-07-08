const express = require('express'),
      morgan = require('morgan'),
      mongoose = require('mongoose'), 
      app = express();

//Configuración
app.set('port', process.env.PORT || 3000);


//Inicialización del servidor
app.listen(app.get('port'), () => {
  console.log('El servidor esta corriendo en el puerto', app.get('port'));
});

//Middleware and Body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Muestra en consola los HTTP requests que se hacen al servidor
app.use(morgan('dev'));


// Establecer la ruta para archivos estáticos
app.use(express.static('public'));

app.use('/uploads', express.static('uploads'));

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


// Importación de las rutas

// const adminGlobal = require('./api/routes/admin-global');
const adminLibreria = require('./api/routes/admin-libreria');
const usuario = require('./api/routes/usuario');
const libros = require('./api/routes/libros');
const librerias = require('./api/routes/librerias');

//Rutas 

app.use('/usuario', usuario);
app.use('/admin-libreria', adminLibreria);
// app.use('/admin-global', adminGlobal);
app.use('/libros', libros);
app.use('/librerias', librerias);


//Esta linea ese ejecuta si ninguna de las rutas anteriores atrapa la solicitud
// app.use((req, res, next) => {
//   const error = new Error('Not found');
//   error.status(404);
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message
//     }
//   })
//   next();
// });


module.exports = app;