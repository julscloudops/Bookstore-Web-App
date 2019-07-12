const Libro = require('./model');

module.exports.registrarLibro = async (req, res) => {
 
  console.log(req.body.data);
  console.log(req.body);

  let nuevoLibro = new Libro({
    title: req.body.title,
    author: req.body.author,
    ISBN: req.body.ISBN,
    genre: req.body.genre,
    editorial: req.body.editorial,
    price: req.body.price,
    description: req.body.description
  });
  
nuevoLibro.save()
.then(
    function(result){
      console.log(result);
      res.json('El libro ha sido registrado exitosamente!');
      console.log('EXITOOO!!');
    }).catch(
    function(err){
      console.log(err);
    }
  )};


