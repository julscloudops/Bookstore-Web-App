document.addEventListener('DOMContentLoaded', listarLibreria);


async function listarLibreria() {

  //Window.location nos da el URL en el que estamos, utilizo splice para recuperar el ID de un libro específico

  let idLibreria = window.location.pathname.slice(16);
  console.log(idLibreria);

  const url = `/libreria/JSON/${idLibreria}`;
  console.log(url);

  const res = await fetch(url);
  const libreria = await res.json();

  console.log(libreria);


  //Client-side rendering de la libreria 
  let logoContainer = document.getElementById('libreria-logo');
  let infoContainer = document.getElementById('libreria-info');

  const libreriaImg = document.createElement('div');
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
  const imgSrc = await fetch(libreria.imgUrl);
  logo.src = imgSrc.url;
  link.href = `/libreria/views/${libreria._id}`;
  libreriaImg.className = 'sucursal';
  ratingContainer.className = 'rating-holder';
  seeThroughRating.className = 'c-rating c-rating--sucursal'
  link.append(logo);
  seeThroughRating.append(rating1, rating2, rating3, rating4, rating5);
  ratingContainer.append(seeThroughRating);
  libreriaImg.append(link, ratingContainer);
  logoContainer.append(libreriaImg);




  // let name = document.createElement('h3');
  // name.textContent = libreria.nombreFantasia;
  // let img = document.createElement('img');
  // let link = document.createElement('a');
  // let imgSrc = await fetch(libreria.imgUrl);
  // img.src = imgSrc.url;
  // link.href = `/libreria/views/${libreria._id}`;
  // link.append(img);
  // imgContainer.append(link);

  let email = document.createElement('p');
  let phone = document.createElement('p');
  let description = document.createElement('p');

  email.innerHTML = `email: ${libreria.email}`;
  email.className = 'libreria-info-txt'
  phone.innerHTML = `teléfono: ${libreria.phone}`;
  phone.className = 'libreria-info-txt';
  description.innerHTML = libreria.description;
  description.className = 'libreria-info-txt'

  infoContainer.append(email, phone, description);



  // const info = document.getElementById('info-libreria');
  // const email = document.createElement('span');
  // email.textContent = libreria.email;
  // info.append(email);




  // // const img = document.getElementById('');
  // const descriptionContainer = document.getElementById('description');
  // const name = document.createElement('p');
  // const description = document.createElement('p');
  // name.textContent = data.name;

  // const imgSrc = await fetch(data.imgUrl);
  // img.src = imgSrc.url;

  // description.textContent = data.description;
  // img.className = 'img';
  // name.className = 'name';
  // descriptionContainer.append(description);
  // autorContainer.append(name, img);



}