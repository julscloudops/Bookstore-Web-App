//Validación de datos
const Joi = require('@hapi/joi');

// //Validación de registro para el usuario
// const registerValidation = (data) => {
//   const schema = {
//     // firstname: Joi.string.min(6),
//     // lastName: Joi.string.min(6),
//     email: Joi.string.min(6).required().email()    
//     // phone: Joi.string.regex(/^\d{4}-\d{4}/),
//     // birthDate : Joi.date.max('1-1-2004').iso(),
//     // gender: Joi.string,
//     // idType: Joi.string,          
//     // id: Joi.string.min(6),
//     // provincia: Joi.string,
//     // canton: Joi.string,
//     // distrito: Joi.string,
//     // location: Joi.string    
//   };
//   return Joi.validate(data, schema);
// };

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



// module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.passwordGenerator = passwordGenerator;
