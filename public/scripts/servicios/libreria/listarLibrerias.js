document.addEventListener('DOMContentLoaded', listarLibrerias);

async function listarLibrerias() {

  const url = 'http://localhost:3000/libreria/';

  const res = await fetch(url);
  const librerias = await res.json();

  console.log(librerias);

  for(let i = 0; i < librerias.length; i++) {
  const container = document.getElementById('libreria-container');
  const libreria = document.createElement('div');
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
  const imgSrc = await fetch(librerias[i].imgUrl);
  logo.src = imgSrc.url;
  link.href = `/libreria/${librerias[i]._id}`;

  libreria.className = 'libreria';
  ratingContainer.className = 'rating-holder';
  seeThroughRating.className = 'c-rating c-rating--libreria'
  
  link.append(logo);
  seeThroughRating.append(rating1, rating2, rating3, rating4, rating5);
  ratingContainer.append(seeThroughRating);
  libreria.append(link, ratingContainer);
  container.append(libreria);

  }

}
