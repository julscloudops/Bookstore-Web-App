const express = require('express'),
      mongoose = require('mongoose'),
      cloudinary = require('cloudinary'),
      session = require('express-session'),
      MongoDBStore = require('connect-mongodb-session')(session),
      morgan = require('morgan'),
      favicon = require('serve-favicon'),
      path = require('path'),
      app = express();

//Configuración
app.set('port', process.env.PORT || 3000);

// Permite utilizar environment variables
const dotenv = require('dotenv');
dotenv.config();

//Inicialización del servidor
app.listen(app.get('port'), () => {
  console.log('El servidor esta corriendo en el puerto', app.get('port'));
});

//Conecta la aplicación con la base de datos
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  },
  () => {
    console.log('La base de datos fue conectada exitosamente!')
  });

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

//Envia el favicon en todo request
app.use(favicon(path.join(__dirname, 'public/images/', 'favicon.ico')));

// Permite subir las imagenes a la nube
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Muestra en consola los HTTP requests que se hacen al servidor
app.use(morgan('dev'));

// Middleware and Body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Sessions
app.use(session({
  store: new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    sameSite: true,
    httpOnly: false
  },
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  
}));

//Establecer la ruta para archivos estáticos
app.use(express.static('public'));
app.use(express.static('./public/uploads'));

//Importación de las rutas
const usuario = require('./api/components/usuario/routes');
const libreria = require('./api/components/libreria/routes');
const sucursal = require('./api/components/sucursal/routes');
const oferta = require('./api/components/oferta/routes');
const autor = require('./api/components/autor/routes');
const libro = require('./api/components/libro/routes');
const search = require('./api/components/search/routes');

//Rutas
app.use('/usuario', usuario);
app.use('/libreria', libreria);
app.use('/sucursal', sucursal);
app.use('/oferta', oferta);
app.use('/autor', autor);
app.use('/libro', libro);
app.use('/search', search);

app.get('/landing-page', (req, res) => {
  res.sendFile('landing-page.html', {root: 'public'}); 
});

module.exports = app;





