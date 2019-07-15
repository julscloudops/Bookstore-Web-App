document.addEventListener('DOMContentLoaded', listarLibros);
document.addEventListener('DOMContentLoaded', getRatings);

async function listarLibros() {

  const url = 'http://localhost:3000/libros/';

  const res = await fetch(url);
  const data = await res.json();

  console.log(data);

  //Client-side rendering del catalogo, el ciclo va a iterar por cada uno de libros registrados dentro de la aplicación.
  for(i = 0; i < 8; i++) {

    const container = document.getElementById('grid-container'); 
    const book = document.createElement('div');

    // const starsOuter = document.createElement('div');
    // const starsInner = document.createElement('div');
    // const rating = document.createElement('span');
    // starsOuter.append(starsInner);
    // starsOuter.className = 'stars-outer';
    // starsInner.className = 'stars-inner';
    // starsInner.style.width = starPercentageRounded;
    // rating.className = 'number-rating';

    const price = document.createElement('span');
    const cover = document.createElement('img');
    const button = document.createElement('button');
    const imgSrc = await fetch(data[i].imgUrl);
    cover.src = imgSrc.url;

    price.className = 'price';
    price.innerHTML = '₡ ' + data[i].price; 
    button.className = 'buy-btn';
    button.innerHTML = 'Agregar al carrito';
    book.className = 'book';

    book.append(cover, price, button);
    container.append(book);
  }

  // console.log(item.author);
  // book.textContent = `${item.author}`;

  // const cover = document.createElement('img');
  //   // console.log(item.imgUrl);
  // //Se hace un fetch para obtener el URL de cada imagen
  //   const imgSrc = await fetch(item.imgUrl);
  //   console.log(imgSrc);

  //   cover.src = imgSrc.url;

  //   container.append(book, cover);

  //   document.body.append(container);

}

// const ratings = {
//   sony: 4.7,
//   samsung: 3.4,
//   vizio: 2.3,
//   panasonic: 3.6,
//   phillips: 4.1
// }


// const starsTotal = 5;

// // Get ratings
// function getRatings() {
//   for (let rating in ratings) {
//     // Get percentage
//     const starPercentage = (ratings[rating] / starsTotal) * 100;

//     // Round to nearest 10
//     const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

//   }

// }