const express = require('express'),
      router = express.Router(),
      Libreria = require('../models/libreria');



 router.post('/', async (req, res) => {

   //Se crea una nueva libreria
  const newLibreria = new Libreria({
    nombreComercial: req.body.firstName,
    nombreFantasia: req.body.lastName, 
    description: req.body.description,
    provincia: req.body.provincia, 
    canton: req.body.canton, 
    distrito: req.body.distrito, 
    direction: req.body.location

  });

  try { 
    console.log(req.body);
    const savedLibreria = await newLibreria.save();
    res.json(newLibreria);
  } catch(err){
    res.json({message: err});
  }

 });  


router.get('/', async (req,res) => {
  try {
    const librerias = await Libreria.find();
    res.json(librerias);
  } catch(err){
    res.json({message: err});
  }
});

module.exports = router;