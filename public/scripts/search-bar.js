
const navbar = document.getElementById('nav');
const searchIcon = document.getElementById('search-btn');
const search = document.getElementById('search');
const tip = document.getElementById('tip');

searchModal();

const blurryLayer = document.getElementById('backdrop');
const searchPopUp = document.getElementById('modal-search');
const modalContainer = document.getElementById('modal-content');

search.addEventListener('keydown', searchEngine);
const exitBtn = document.getElementById('exit-btn');


let i = 0;
let message = "Busca tus libros favoritos!";
let speed = 100;

searchIcon.addEventListener("mouseover", () => {
  search.focus();
  typeWriter();
});

search.addEventListener('keydown', () => {
  tip.style.visibility = 'visible';
  tip.style.opacity = '1';
});

function typeWriter() {
  if (i < message.length) {
    msg = search.getAttribute('placeholder') + message.charAt(i);
    search.setAttribute('placeholder', msg);
    i++;
    setTimeout(typeWriter, speed);
  }
}


exitBtn.addEventListener('click', () => {
  searchPopUp.style.display = 'none';
  blurryLayer.style.display = 'none';

  //Esto permite que se borren los elementos despues de hacer una búsqueda
  let item = modalContainer.firstChild;
  while (item) {
    modalContainer.removeChild(item);
    item = modalContainer.firstChild;
  }

});

async function searchEngine(event) {

  if (event.keyCode == 13) {
    searchPopUp.style.display = 'block';
    blurryLayer.style.display = 'block';
    //Se guarda el valor del input para hacer la búsqueda
    let query = search.value;

    //Se hace el request específico a la base de datos
    let url = `/search/${query}`;
    const res = await fetch(url);
    const searchContentArray = await res.json();

    let usuarios = searchContentArray[0];
    let librerias = searchContentArray[1];
    let sucursales = searchContentArray[2];
    let autores = searchContentArray[3];
    let libros = searchContentArray[4];
    let ofertas = searchContentArray[5];

    for (let i = 0; i < usuarios.length; i++) {
      const usuario = document.createElement('div');
      const name = document.createElement('span');
      const link = document.createElement('a');
      const img = document.createElement('img');
      const imgSrc = await fetch(usuarios[i].imgUrl);
      name.textContent = usuarios[i].firstName;
      link.href = `/usuario/views/${usuarios[i]._id}`;
      img.src = imgSrc.url;
      usuario.className = 'itemSearch';
      name.className = 'nameSearch';
      img.className = 'imgSearch';
      link.append(img);
      usuario.append(name, link);
      modalContainer.append(usuario);

    }

    for (let i = 0; i < librerias.length; i++) {
      const libreria = document.createElement('div');
      const name = document.createElement('span');
      const link = document.createElement('a');
      const img = document.createElement('img');
      const imgSrc = await fetch(librerias[i].imgUrl);
      name.textContent = librerias[i].nombreFantasia;
      link.href = `/libreria/views/${librerias[i]._id}`;
      img.src = imgSrc.url;
      libreria.className = 'itemSearch';
      name.className = 'nameSearch';
      img.className = 'imgSearch';
      link.append(img);
      libreria.append(name, link);
      modalContainer.append(libreria);
    }

    for (let i = 0; i < sucursales.length; i++) {
      console.log('Hola');
    }

    for (let i = 0; i < autores.length; i++) {
      const autor = document.createElement('div');
      const name = document.createElement('span');
      const link = document.createElement('a');
      const img = document.createElement('img');
      const imgSrc = await fetch(autores[i].imgUrl);
      name.textContent = autores[i].name;
      link.href = `/autor/views/${autores[i]._id}`;
      img.src = imgSrc.url;
      autor.className = 'itemSearch';
      name.className = 'nameSearch';
      img.className = 'imgSearch';
      link.append(img);
      autor.append(name, link);
      modalContainer.append(autor);

      console.log(`Este es el modalContainer ${modalContainer}`);
    }

    for (let i = 0; i < libros.length; i++) {

      const libro = document.createElement('div');
      const title = document.createElement('span');
      const link = document.createElement('a');
      const img = document.createElement('img');
      const imgSrc = await fetch(libros[i].imgUrl);
      title.textContent = libros[i].title;
      link.href = `/libro/views/${libros[i]._id}`;
      img.src = imgSrc.url;
      libro.className = 'itemSearch';
      title.className = 'nameSearch';
      img.className = 'imgSearch';
      link.append(img);
      libro.append(title, link);
      modalContainer.append(libro);

    }

    for (let i = 0; i < ofertas.length; i++) {

      const oferta = document.createElement('div');
      const name = document.createElement('span');
      const link = document.createElement('a');
      const img = document.createElement('img');
      const imgSrc = await fetch(ofertas[i].imgUrl);
      name.textContent = ofertas[i].name;
      link.href = `/oferta/views/${ofertas[i]._id}`;
      img.src = imgSrc.url;
      oferta.className = 'itemSearch';
      name.className = 'nameSearch';
      img.className = 'imgSearch';
      link.append(img);
      oferta.append(name, link);
      modalContainer.append(oferta);

    }

    console.log(searchContentArray);

  }

}

document.addEventListener('keydown', (event) => {
  if (event.keyCode == 27) {
    searchPopUp.style.display = 'none';
    blurryLayer.style.display = 'none';


    //Esto permite que se borren los elementos despues de hacer una búsqueda
    let item = modalContainer.firstChild;
    while (item) {
      modalContainer.removeChild(item);
      item = modalContainer.firstChild;
    }

  }
});


function searchModal() {
  let backdrop = document.createElement('div');
  backdrop.id = 'backdrop';
  backdrop.className = 'backdrop';

  let modal = document.createElement('div');
  modal.id = 'modal-search';
  modal.className = 'modal-search';

  let div = document.createElement('div');
  let img = document.createElement('img');
  let p = document.createElement('p');
  img.id = 'exit-btn';
  img.className = 'exit-btn';
  img.src = '/images/exit.svg';
  p.className = 'search-txt';
  p.textContent = 'Resultado de la búsqueda:';

  let content = document.createElement('div');
  content.id = 'modal-content';
  content.className = 'modal-content';

  div.append(img, p);
  modal.append(div, content);
  navbar.append(backdrop, modal);
}


const logo = document.getElementById('logoNavbar');

logo.addEventListener('click', () => {
  window.location.href = 'http://localhost:3000/usuario/inicio';

});