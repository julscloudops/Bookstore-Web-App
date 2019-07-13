const express = require('express'),
      router = express.Router(),
      multer = require('multer');
     libroController = require('./controller');



//Settings de Multer, permite subir imagenes a la página
const storage = multer.diskStorage({
  destination: function(req, file, cb){
  cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null,file.fieldname + '-' + new Date().toISOString());
  }
});

const fileFilter = (req, file, cb) => {
if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
  cb(null, true);
} else {
  cb(null, false);
}};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

//Registrar libro
router.post('/registro', upload.single('img'), libroController.registrarLibro);














// //Maneja los GET requests a /libros
// router.get('/', (req, res, next) => {
//       Libro.find()
//       .select('name author genre _id imagenLibro')
//         .exec()
//         .then(docs => {
//           let x = 10;
//           const response = {
//           count: docs.length,
//           libros: docs.map(doc => {
//             return {
//               name: doc.name,
//               author: doc.author,
//               genre: doc.genre,
//               imagenLibro: doc.imagenLibro,
//               _id: doc._id,
//               request: {
//                 type: 'GET',
//                 url: 'http://localhost:8080/libros/'+doc._id
//               }
//             }
//           })
//         };
//           //  if(docs.length>=0){
//           res.status(200).json(docs);
//           //    } else {
//           //      res.status(404).json({
//           //        message: 'No entries found'
//           //      })
//           //    }
//           });
//         });



module.exports = router;


//   // const newBook = await new Libro({
//   //     ISBN : req.body.ISBN,
//   //     title: req.body.title,
//   //     author: req.body.author,
//   //     genre: req.body.genre,
//   //     editorial: req.body.editorial,     
//   //     price : req.body.price,
//   //     bookImg: req.file.path
//   //   });

//   try {
//     const savedBook = await newBook.save();
//     res.json(savedBook);
//   } catch (err) {
//     res.status(400).send(err);

//   }

//  });
//       router.get('/:idLibro', (req, res, next) => {
//         const id = req.params.idLibro;
//         Libro.findById(id)
//         .select('ISBN name author genre bookImg')
//           .exec()
//           .then(doc => {
//             console.log("From database", doc);
//             if(doc){
//                res.status(200).json(doc)({
//                  libro: doc,
//                  request: {
//                    type: 'GET',
//                    url: "http://localhost:8080/libros/"+result._id
//                  }
//                });
//             } else {
//               res.status(404).json({message: 'No valid entry found for provided ID'})
//             }

//           })
//           .catch(err => {
//             console.log(err);
//             res.status(500).json({
//               error: err
//             })
//             next();
//           })
//       });

//       router.patch('/:idLibro', (req, res, next) => {
//         const id = req.params.idLibro;
//         // const updateOps = {};
//         // for(const ops of req.body){
//         //   updateOps[ops.propName] = ops.value;
//         // }
//         Libro.update({ _id: req.params.libroId}, { $set: req.body })
//         .exec()
//         .then(result => {
//           res.status(200).json({
//             message: 'El libro fue actualizado',
//             request: {
//               type: 'GET',
//               url: "http://localhost:8080/libros/"+result._id
//             }
//           })
//         })
//         .catch(err => {
//           console.log(err);
//           res.status(500).json({
//             error: err
//           });
//         });
//       });

//       router.delete('/:idLibro', (req, res, next) => {
//         const id = req.params.idLibro;
//         Libro.remove({_id: id})
//           .exec()
//           .then(result => { 
//             res.status(200).json({
//             message: 'El libro fue eliminado exitosamente!',
//             request: {
//               type: 'POST',
//               url: "http://localhost:8080/libros/"+result._id,
//               body: {name: 'String', author: 'String', genre: 'String'}
//             }
//             })
//           })
//           .catch(err => {
//             console.log(err);
//             res.status(500).json({
//               error: err
//             });
//           });
//       });