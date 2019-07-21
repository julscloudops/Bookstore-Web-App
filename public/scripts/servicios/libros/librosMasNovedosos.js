document.addEventListener('DOMContentLoaded', listarLibrosNovedosos);

async function listarLibrosNovedosos() {

  const url = 'http://localhost:3000/libros/librosNovedosos';
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);

  //Client-side rendering de los libros mas novedosos
  for (let i = 0; i < 3; i++) {
    const list = document.getElementById('list1');
    const book = document.createElement('div');
    const link = document.createElement('a');
    const cover = document.createElement('img');
    const imgSrc = await fetch(data[i].imgUrl);
    const container = document.createElement('div');
    const seeThroughRating = document.createElement('div');
    const rating1 = document.createElement('button');
    const rating2 = document.createElement('button');
    const rating3 = document.createElement('button');
    const rating4 = document.createElement('button');
    const rating5 = document.createElement('button');
    const price = document.createElement('span');
    const addToCart = document.createElement('button');

    cover.src = imgSrc.url;
    link.href = `/libros/views/${data[i]._id}`;
    book.className = 'book';
    container.className = 'rating-holder';
    seeThroughRating.className = 'c-rating c-rating--big'
    price.className = 'price';
    addToCart.className = 'buy-btn';
    price.innerHTML = '₡ ' + data[i].price;
    addToCart.innerHTML = 'Agregar al carrito';

    link.append(cover);
    seeThroughRating.append(rating1, rating2, rating3, rating4, rating5);
    container.append(seeThroughRating, price, addToCart);
    book.append(link, container);
    list.append(book);
  }

  for (let i = 3; i < 6; i++) {
    const list = document.getElementById('list2');
    const book = document.createElement('div');

    const link = document.createElement('a');
    const cover = document.createElement('img');
    const imgSrc = await fetch(data[i].imgUrl);

    const container = document.createElement('div');
    const seeThroughRating = document.createElement('div');
    const rating1 = document.createElement('button');
    const rating2 = document.createElement('button');
    const rating3 = document.createElement('button');
    const rating4 = document.createElement('button');
    const rating5 = document.createElement('button');
    const price = document.createElement('span');
    const addToCart = document.createElement('button');

    cover.src = imgSrc.url;
    link.href = `/libros/${data[i]._id}`;
    book.className = 'book';
    container.className = 'rating-holder';
    seeThroughRating.className = 'c-rating c-rating--big'
    price.className = 'price';
    addToCart.className = 'buy-btn';
    price.innerHTML = '₡ ' + data[i].price;
    addToCart.innerHTML = 'Agregar al carrito';



    link.append(cover);
    seeThroughRating.append(rating1, rating2, rating3, rating4, rating5);
    container.append(seeThroughRating, price, addToCart);
    book.append(link, container);
    list.append(book);
  }
  for (let i = 6; i < 9; i++) {
    const list = document.getElementById('list3');
    const book = document.createElement('div');
    const link = document.createElement('a');
    const cover = document.createElement('img');
    const imgSrc = await fetch(data[i].imgUrl);
    const container = document.createElement('div');
    const seeThroughRating = document.createElement('div');
    const rating1 = document.createElement('button');
    const rating2 = document.createElement('button');
    const rating3 = document.createElement('button');
    const rating4 = document.createElement('button');
    const rating5 = document.createElement('button');
    const price = document.createElement('span');
    const addToCart = document.createElement('button');

    cover.src = imgSrc.url;
    link.href = `/libros/${data[i]._id}`;
    book.className = 'book';
    container.className = 'rating-holder';
    seeThroughRating.className = 'c-rating c-rating--big'
    price.className = 'price';
    addToCart.className = 'buy-btn';
    price.innerHTML = '₡ ' + data[i].price;
    addToCart.innerHTML = 'Agregar al carrito';

    link.append(cover);
    seeThroughRating.append(rating1, rating2, rating3, rating4, rating5);
    container.append(seeThroughRating, price, addToCart);
    book.append(link, container);
    list.append(book);
  }

}