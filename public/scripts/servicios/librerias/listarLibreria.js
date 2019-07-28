document.addEventListener('DOMContentLoaded', listarLibreria);
let imgContainer = document.getElementById('logo-libreria');


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
  let img = document.createElement('img');
  let link = document.createElement('a');
  let imgSrc = await fetch(libreria.imgUrl);
  img.src = imgSrc.url;
  link.href = `/libreria/views/${libreria._id}`;
  link.append(img);
  imgContainer.append(link);

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