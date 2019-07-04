const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      mongoose = require('mongoose'),
      app = express();

// Permite utilizar environment variables 
const dotenv = require('dotenv');
dotenv.config();    

// Importación de las rutas
const adminGlobal = require('./api/routes/admin-global');
const adminLibreria = require('./api/routes/admin-libreria');
const usuario = require('./api/routes/usuario');  
const libros = require('./api/routes/libros');



mongoose.connect('mongodb+srv://'+process.env.MONGO_ATLAS_USER+':'+process.env.MONGO_ATLAS_PW+ '@palo-mango-solutions-abqxf.gcp.mongodb.net/Parrafo-Digital?retryWrites=true&w=majority', { useNewUrlParser: true });

mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Se encarga de los errores CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS') {
   res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
   return res.status(200).json({message: 'It works!'});
  }
  next(); 
});

//Rutas 
app.use(express.static('public'));
app.use('/libros', libros); 
app.use('/usuario', usuario);
app.use('/admin-libreria', adminLibreria);
app.use('/admin-global', adminGlobal);

//Esta linea ese ejecuta si ninguna de las rutas anteriores atrapa la solicitud
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
  next();
});



module.exports = app;

