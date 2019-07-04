const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-authentication');

// Configuración para poder subir imagenes
const storage = multer.diskStorage({
destination: function(req, file, cb){
cb(null, './uploads');
},
filename: function(req, file, cb){
cb(null, new Date().toISOString() + file.originalname);
}
});

const fileFilter = (req, file, cb) => {
// Rechaza un archivo
if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
  cb(null, true);
} else {
  cb(null, false);
}
};

const upload = multer({
  storage: storage, limits: {
  fileSize: 1024 * 2014 * 5
},
fileFilter: fileFilter
});  

const Libro = require('../models/libros');

//Maneja los GET requests a /libros
router.get('/', (req, res, next) => {
      Libro.find()
      .select('name author genre _id imagenLibro')
        .exec()
        .then(docs => {
          let x = 10;
          const response = {
          count: docs.length,
          libros: docs.map(doc => {
            return {
              name: doc.name,
              author: doc.author,
              genre: doc.genre,
              imagenLibro: doc.imagenLibro,
              _id: doc._id,
              request: {
                type: 'GET',
                url: 'http://localhost:8080/libros/'+doc._id
              }
            }
          })
        };
          //  if(docs.length>=0){
          res.status(200).json(docs);
          //    } else {
          //      res.status(404).json({
          //        message: 'No entries found'
          //      })
          //    }
          });
        });

      router.post('/', upload.single('imagenLibro'), checkAuth, (req, res, next) => {
        const libro = new Libro({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          author: req.body.author,
          genre: req.body.genre,
          imagenLibro: req.file.path
        });
        libro
          .save()
          .then(result => {
            console.log(result);
          })
          .catch(err => console.log(err));
        res.status(201).json({
          message: 'Libro creado exitosamente!',
          libroCreado: {
            name: result.name,
            author: result.author,
            genre: result.genre,
            _id: result._id,
            request: {
              type: 'GET',
              url: "http://localhost:8080/libros/"+result._id
            }
          }
        });
        next();
      });

      router.get('/:idLibro', (req, res, next) => {
        const id = req.params.idLibro;
        Libro.findById(id)
        .select('name author genre _id imagenLibro')
          .exec()
          .then(doc => {
            console.log("From database", doc);
            if(doc){
               res.status(200).json(doc)({
                 libro: doc,
                 request: {
                   type: 'GET',
                   url: "http://localhost:8080/libros/"+result._id
                 }
               });
            } else {
              res.status(404).json({message: 'No valid entry found for provided ID'})
            }
           
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            })
            next();
          })
      });

      router.patch('/:idLibro', checkAuth, (req, res, next) => {
        const id = req.params.idLibro;
        // const updateOps = {};
        // for(const ops of req.body){
        //   updateOps[ops.propName] = ops.value;
        // }
        Libro.update({ _id: req.params.libroId}, { $set: req.body })
        .exec()
        .then(result => {
          res.status(200).json({
            message: 'El libro fue actualizado',
            request: {
              type: 'GET',
              url: "http://localhost:8080/libros/"+result._id
            }
          })
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
      });

      router.delete('/:idLibro', checkAuth, (req, res, next) => {
        const id = req.params.idLibro;
        Libro.remove({_id: id})
          .exec()
          .then(result => { 
            res.status(200).json({
            message: 'El libro fue eliminado exitosamente!',
            request: {
              type: 'POST',
              url: "http://localhost:8080/libros/"+result._id,
              body: {name: 'String', author: 'String', genre: 'String'}
            }
            })
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      });


      module.exports = router;