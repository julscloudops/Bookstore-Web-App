const searchIcon = document.getElementById('search-btn');
const search = document.getElementById('search');
const tip = document.getElementById('tip');

const blurryLayer = document.getElementById('backdrop');
const searchPopUp = document.getElementById('modal-search');
const modalContainer = document.getElementById('modal-container');
const exitBtn = document.getElementById('exit-btn');

var i = 0;
var message = "Busca tus libros favoritos!";
var speed = 100;

searchIcon.addEventListener("mouseover", () => {
  search.focus();
  typeWriter();
});

function typeWriter() {
  if (i < message.length) {
    msg = search.getAttribute('placeholder') + message.charAt(i);
    search.setAttribute('placeholder', msg);
    i++;
    setTimeout(typeWriter, speed);
  }
}

search.addEventListener('keydown', () => {
  tip.style.visibility = 'visible';
  tip.style.opacity = '1';
});

search.addEventListener('keydown', searchEngine);

async function searchEngine(event) {

  if (event.keyCode == 13) {
    searchPopUp.style.display = 'block';
    blurryLayer.style.display = 'block';
    //Se guarda el valor del input para hacer la búsqueda
    let query = search.value;

    //Se hace el request específico a la base de datos
    let url = `/search/${query}`;
    const res = await fetch(url);
    const data = await res.json();

    let usuarios = data[0];
    let librerias = data[1];
    let sucursales = data[2];
    let autores = data[3];
    let libros = data[4];
    // let ofertas = data[5];

    for (let i = 0; i < usuarios.length; i++) {
      console.log('Hola');

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
      libreria.className = 'item';
      name.className = 'name';
      img.className = 'img';
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
      autor.className = 'item';
      name.className = 'name';
      img.className = 'img';
      link.append(img);
      autor.append(name, link);
      modalContainer.append(autor);
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
      libro.className = 'item';
      title.className = 'name';
      img.className = 'img';
      link.append(img);
      libro.append(title, link);
      modalContainer.append(libro);

    }



    console.log(data);

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






// const logo = document.getElementById('logoNavbar');

// logo.addEventListener('click', () => {
// window.location.href = 'http://localhost:3000/usuario/inicio';

// });