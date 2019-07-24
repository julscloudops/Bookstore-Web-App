document.addEventListener('DOMContentLoaded', listarAutor);

async function listarAutor() {

  //Window.location nos da el URL en el que estamos, utilizo splice para recuperar el ID de un libro específico
  const idAutor = window.location.pathname.slice(13);
  console.log(idAutor);

  const url = `/autor/JSON/${idAutor}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();

  //Client-side rendering del autor 
  const autorContainer = document.getElementById('autor');
  const descriptionContainer = document.getElementById('description');
  const name = document.createElement('p');
  const img = document.createElement('img');
  const description = document.createElement('p');
  name.textContent = data.name;
  const imgSrc = await fetch(data.imgUrl);
  img.src = imgSrc.url;
  description.textContent = data.description;
  img.className = 'img';
  name.className = 'name';
  descriptionContainer.append(description);
  autorContainer.append(name, img);


}



