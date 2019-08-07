const cloudinary = require('cloudinary'),
  Club = require('./model');


exports.registrarClub = async (req, res) => {

  console.log(req.body);

  //Busca que no exista otro club con el mismo nombre 
  const nameExists = await Club.findOne({
    name: req.body.name
  });
  if (nameExists) return res.status(400).send('Ya se encuentra un club registrado con el mismo nombre');

  // Se guarda la imagen en cloudinary y la dirección de la imagen en la base de datos
  const result = await cloudinary.v2.uploader.upload(req.file.path);

  //Se crea un nuevo libro
  const nuevoClub = new Club({
    // adminClub: req.session.idAdminLibreria,
    idLibreria: req.body.idLibreria,  
    name: req.body.name,
    meetingDate: req.body.meetingDate,
    // categoria: req.body.categoria,
    libroPorLeer: JSON.parse(req.body.libroPorLeer),
    meetingPlace: JSON.parse(req.body.meetingPlace),
    description: req.body.description,
    imgUrl: result.url,
    cloudinary_id: result.public_id,
  
  });

  //Guarda el nuevo usuario en la base de datos
  const clubGuardado = await nuevoClub.save();
  console.log(clubGuardado);

  res.redirect(`/club/views?id=${clubGuardado._id}`);

}

exports.listarClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.idClub);
    res.json(club);
  } catch (err) {
    res.json({
      message: err
    })
  }
}


exports.listarClubes = async (req, res) => {
  try {
    const clubes = await Club.find();
    res.json(clubes);

  } catch (err) {
    res.json({
      message: err
    })
  }
}

