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

  librosAutor(data);

}
// document.addEventListener('DOMContentLoaded', librosAutor);

// let url = new URL(window.location.href);
// let idAutor = url.searchParams.get('id');

async function librosAutor(data) {
  const urlLibrosAutor = `http://localhost:3000/libro/librosAutor/${data._id}`;
  const resLibrosAutor = await fetch(urlLibrosAutor);
  const librosAutor = await resLibrosAutor.json();
  console.log('Estos son los libros del autor', librosAutor);

  //Client-side rendering de los libros mas novedosos
  for (let i = 0; i < librosAutor.length; i++) {
    const container = document.getElementById('libros-autor');
    const book = document.createElement('div');
    const link = document.createElement('a');
    const cover = document.createElement('img');
    const imgSrc = await fetch(librosAutor[i].imgUrl);
    const innerContainer = document.createElement('div');
    const seeThroughRating = document.createElement('div');
    const rating1 = document.createElement('button');
    const rating2 = document.createElement('button');
    const rating3 = document.createElement('button');
    const rating4 = document.createElement('button');
    const rating5 = document.createElement('button');
    const addToCart = document.createElement('button');

    cover.src = imgSrc.url;
    link.href = `/libro/views/${librosAutor[i]._id}`;
    book.className = 'book';
    innerContainer.className = 'rating-holder';
    seeThroughRating.className = 'c-rating c-rating--big'
    addToCart.className = 'buy-btn';
    addToCart.innerHTML = 'Agregar al carrito';

    link.append(cover);
    seeThroughRating.append(rating1, rating2, rating3, rating4, rating5);
    innerContainer.append(seeThroughRating, addToCart);
    book.append(link, innerContainer);
    container.append(book);
  }

  addToCart(librosAutor);

}


function addToCart(librosAutor) {

  //Permite guardar libros en el carrito desde otras partes de la página
  let addToCartBtns = document.querySelectorAll('.buy-btn');
  console.log('Estos son los botónes de agregar al carrito', addToCartBtns);

  let CART = [];

  for (let i = 0; i < addToCartBtns.length; i++) {
    addToCartBtns[i].addEventListener('click', () => {

      CART.push(librosAutor[i]);
      window.localStorage.setItem('CART', JSON.stringify(CART));
      let carrito = JSON.parse(localStorage['CART']);
      console.log('Este es el array que se guarda en localStorage', carrito);
      console.log(CART);

    });

  }

}