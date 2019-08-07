const User = require('../usuario/model'),
      Libreria = require('../libreria/model'),
      Sucursal = require('../sucursal/model'),
      Autor = require('../autor/model'),
      Libro = require('../libro/model'),
      Oferta = require('../oferta/model'),
      Club = require('../club/model');


exports.searchEngine = async (req, res) => {

  let query = req.params.query;
  console.log(`Este es el query! ${query}`);

  


  try {
    let usuarios = await User.find({
      "$or": 
      [{firstName: {$regex: query}}, {lastName: {$regex: query}} ]
    });

    let librerias = await Libreria.find({nombreFantasia: {$regex: query}});
    let sucursales = await Sucursal.find({name: {$regex: query}});
    

    let autores = await Autor.find({name: {$regex: query}});

    let libros = await Libro.find({
      "$or":
      [{isbn: {$regex: query}},
       {title: {$regex: query}},
       {author: {$regex: query}}, 
       {categoria: {$regex: query}},
       {genero: {$regex: query}},
       {editorial: {$regex: query}},
       {idAdminLibreria: {$regex: query}} ]
    });
    
    let ofertas = await Oferta.find({
      "$or":
      [{name: {$regex: query}},
      {idLibreria: {$regex: query}}]
    });

    let clubes = await Club.find({name: {$regex: query}});

    let searchData = [usuarios, librerias, sucursales, autores, libros, ofertas, clubes];

    res.json(searchData);
  } catch (err) {
    res.json({
      message: err
    })
  }

}
