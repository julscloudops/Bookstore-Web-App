const express = require('express'),
      router = express.Router(),
      Sucursal  = require('./model');


 router.post('/registro', async (req, res) => {

  //Se crea una nueva sucursal
 const newSucursal = new Sucursal({
   nombreComercial: req.body.nombreComercial,
   nombreFantasia: req.body.nombreFantasia, 
   phone: req.body.phone,
   provincia: req.body.provincia, 
   canton: req.body.canton, 
   distrito: req.body.distrito, 
   direction: req.body.location,
   googleMaps: req.body.location

 });

 try { 
   console.log(req.body);
   const savedSucursal = await newSucursal.save();
   res.json(savedSucursal);
 } catch(err){
   res.json({message: err});
 }

});  



module.exports = router;
