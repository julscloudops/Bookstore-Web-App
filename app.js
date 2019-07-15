const express = require('express'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      app = express();

//Configuración
app.set('port', process.env.PORT || 3000);

//Inicialización del servidor
app.listen(app.get('port'), () => {
  console.log('El servidor esta corriendo en el puerto', app.get('port'));
});

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

// Muestra en consola los HTTP requests que se hacen al servidor
app.use(morgan('dev'));





//Middleware and Body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Establecer la ruta para archivos estáticos
app.use(express.static('./public'));
app.use(express.static('./public/uploads'));


// Importación de las rutas
// const adminGlobal = require('./api/components/admin-global/routes');
// const adminLibreria = require('./api/components/admin-libreria/routes');
const usuario = require('./api/components/usuario/routes');
const libreria = require('./api/components/libreria/routes');
const sucursal = require('./api/components/sucursal/routes');
const autor = require('./api/components/autor/routes');
const libros = require('./api/components/libro/routes');


//Rutas

app.get('/hola', (req, res) => {
  res.sendFile(__dirname + '/public/catalogo.html')
});

 
// app.use('/admin-global', adminGlobal); 
// app.use('/admin-libreria', adminLibreria);
app.use('/usuario', usuario);
app.use('/libreria', libreria);
app.use('/sucursal', sucursal);
app.use('/autor', autor);
app.use('/libros', libros);

module.exports = app;





