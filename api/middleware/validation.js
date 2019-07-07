//Validación de datos
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

//Validación de registro para el usuario
const registerValidation = (data) => {
  const schema = {
    firstname: Joi.string().min(6).required(),
    lastName: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),        
    phone: Joi.string().regex(/^\d{4}-\d{4}/).required(),
    birthDate : Joi.date().max('1-1-2004').iso(),
    gender: Joi.string().required(),
    idType: Joi.string().required(),          
    id: Joi.string().min(6).required(),
    provincia: Joi.string().required(),
    canton: Joi.string().required(),
    distrito: Joi.string().required(),
    location: Joi.string().required()    
  };
  return Joi.validate(data, schema);
};

//Validación de login para el usuario
const loginValidation = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  };
  return Joi.validate(data, schema);
};

//Generador de contraseñas
function passwordGenerator() {
  var length = 12,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

// console.log(passwordGenerator());

function checkToken (req, res, next){
  const token = req.header('auth-token');
  if(!token) return res.status(401).sned('Acceso denegado');
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
  } catch (err) {
    res.status(400).send('Token invalido');
  }

}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.passwordGenerator = passwordGenerator;
module.exports.checkToken = checkToken;
