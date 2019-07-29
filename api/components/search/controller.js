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
    let ofertas = await Oferta.find({name: {$regex: query}});

    let searchData = [usuarios, librerias, sucursales, autores, libros, ofertas];

    res.json(searchData);
  } catch (err) {
    res.json({
      message: err
    })
  }

}
