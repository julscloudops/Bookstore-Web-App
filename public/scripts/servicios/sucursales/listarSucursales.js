document.addEventListener('DOMContentLoaded', listarSucursales);

async function listarSucursales() {

  const url = 'http://localhost:3000/libreria/home';

  const res = await fetch(url);
  const sucursales = await res.json();

  console.log(sucursales);

  for(let i = 0; i < sucursales.length; i++) {
  const container = document.getElementById('sucursales');
  const sucursal = document.createElement('div');
  const link = document.createElement('a');
  const logo = document.createElement('img');    
  const ratingContainer = document.createElement('div');
  const seeThroughRating = document.createElement('div');
  const rating1 = document.createElement('button');
  const rating2 = document.createElement('button');
  const rating3 = document.createElement('button');
  const rating4 = document.createElement('button');
  const rating5 = document.createElement('button');

  //Este fetch es para traer la imagen de cloudinary
  const imgSrc = await fetch(sucursales[i].imgUrl);
  logo.src = imgSrc.url;
  link.href = `/sucursal/views/${sucursales[i]._id}`;

  sucursal.className = 'sucursal';
  ratingContainer.className = 'rating-holder';
  seeThroughRating.className = 'c-rating c-rating--sucursal'
  
  link.append(logo);
  seeThroughRating.append(rating1, rating2, rating3, rating4, rating5);
  ratingContainer.append(seeThroughRating);
  sucursal.append(link, ratingContainer);
  container.append(sucursal);

  }

}
