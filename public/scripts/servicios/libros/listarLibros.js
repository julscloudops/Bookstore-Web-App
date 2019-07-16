document.addEventListener('DOMContentLoaded', listarLibros);

async function listarLibros() {

  const url = 'http://localhost:3000/libros/';

  const res = await fetch(url);
  const data = await res.json();

  console.log(data);

  //Client-side rendering del catalogo, el ciclo va a iterar por cada uno de libros registrados dentro de la aplicación.
  for(i = 0; i < 8; i++) {

    const container = document.getElementById('grid-container'); 
    const book = document.createElement('div');
    const cover = document.createElement('img');    
    const ratingContainer = document.createElement('div');
    const seeThroughRating = document.createElement('div');
    const rating1 = document.createElement('button');
    const rating2 = document.createElement('button');
    const rating3 = document.createElement('button');
    const rating4 = document.createElement('button');
    const rating5 = document.createElement('button');
    const price = document.createElement('span');  
    const addToCart = document.createElement('button');

    const imgSrc = await fetch(data[i].imgUrl);
    cover.src = imgSrc.url;

    book.className = 'book';
    ratingContainer.className = 'rating-holder';
    seeThroughRating.className = 'c-rating c-rating--big'
    price.className = 'price';    
    addToCart.className = 'buy-btn';
    price.innerHTML = '₡ ' + data[i].price; 
    addToCart.innerHTML = 'Agregar al carrito';

    seeThroughRating.append(rating1, rating2, rating3, rating4, rating5);
    ratingContainer.append(seeThroughRating);
    book.append(cover, ratingContainer, price, addToCart);
    container.append(book);
  }

}
