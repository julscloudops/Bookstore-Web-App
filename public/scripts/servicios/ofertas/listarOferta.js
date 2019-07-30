document.addEventListener('DOMContentLoaded', listarOferta);

async function listarOferta() {

  //Window.location nos da el URL en el que estamos, utilizo splice para recuperar el ID de un libro específico
  const idOferta = window.location.pathname.slice(14);
  console.log(idOferta);

  const url = `/oferta/JSON/${idOferta}`;
  console.log(url);
  const res = await fetch(url);
  const oferta = await res.json();
  console.log(oferta);

  // Client-side rendering de la oferta 
  const container = document.getElementById('oferta');
  const name = document.createElement('p');
  const img = document.createElement('img');
  const description = document.createElement('p');

  name.textContent = oferta.name;
  const imgSrc = await fetch(oferta.imgUrl);
  img.src = imgSrc.url;
  description.textContent = oferta.description;
  img.className = 'oferta-img';
  name.className = 'oferta-text';
  description.className = 'oferta-text';
  container.append(name, description, img);


}



