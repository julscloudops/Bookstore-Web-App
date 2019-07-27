const User = require('../usuario/model'),
  Libreria = require('../libreria/model'),
  Sucursal = require('../sucursal/model'),
  Autor = require('../autor/model'),
  Libro = require('../libro/model'),
  Oferta = require('../oferta/model');


exports.searchEngine = async (req, res) => {

  let query = req.params.query;
  console.log(`Este es el query! ${query}`);

  try {

    let usuarios = await User.find({firstName: {$regex: query}});
    let librerias = await Libreria.find({nombreFantasia: {$regex: query}});
    let sucursales = await Sucursal.find({name: {$regex: query}});
    let autores = await Autor.find({name: {$regex: query}});
    let libros = await Libro.find({title: {$regex: query}});

    // let ofertas = await Oferta.find({name: {$regex: query}});

    let data = [usuarios, librerias, sucursales, autores, libros];

    res.json(data);
  } catch (err) {
    res.json({
      message: err
    })
  }

}


//   let usuarios = User.find({
//     $or: [{
//       'name': {
//         $regex: `.*${req.params.search}.*`,
//         '$options': 'i'
//       }
//     }]
//   }).exec();

//   let librerias = Libreria.find({
//     $or: [{
//       'name': {
//         $regex: `.*${req.params.search}.*`,
//         '$options': 'i'
//       }
//     }]
//   }).exec();

//   let sucursales = Sucursal.find({
//     $or: [{
//       'name': {
//         $regex: `.*${req.params.search}.*`,
//         '$options': 'i'
//       }
//     }]
//   }).exec();

//   let autores = Autor.find({
//     $or: [{
//       'name': {
//         $regex: `.*${req.params.search}.*`,
//         '$options': 'i'
//       }
//     }]
//   }).exec();

//   let libros = Libro.find({
//     $or: [{
//       'name': {
//         $regex: `.*${req.params.search}.*`,
//         '$options': 'i'
//       }
//     }]
//   }).exec();

//   let ofertas = Oferta.find({
//     $or: [{
//       'name': {
//         $regex: `.*${req.params.search}.*`,
//         '$options': 'i'
//       }
//     }]
//   }).exec();

// return Promise.all([usuarios, librerias, sucursales, autores, libros, ofertas]).then(() => {

//   let data = {
//     usuarios: result[0],
//     librerias: result[1],
//     sucursales: result[2],
//     autores: result[3],
//     libros: result[4],
//     ofertas: result[5]
//   }


// });