document.addEventListener('DOMContentLoaded', listarLibros);


async function listarLibros() {

  const url = 'http://localhost:3000/libro/';

  const res = await fetch(url);
  const data = await res.json();

  console.log(data);

  //Client-side rendering del catalogo, el ciclo va a iterar por cada uno de libros registrados dentro de la aplicación.
  for (let i = 0; i < data.length; i++) {

    const container = document.getElementById('grid-container');
    const book = document.createElement('div');
    const link = document.createElement('a');
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

    link.href = `/libro/views/${data[i]._id}`;

    const imgSrc = await fetch(data[i].imgUrl);
    cover.src = imgSrc.url;

    book.className = 'book';
    ratingContainer.className = 'rating-holder';
    seeThroughRating.className = 'c-rating c-rating--big'
    price.className = 'price';
    addToCart.className = 'buy-btn';
    price.innerHTML = '₡ ' + data[i].price;
    addToCart.innerHTML = 'Agregar al carrito';

    link.append(cover);
    seeThroughRating.append(rating1, rating2, rating3, rating4, rating5);
    ratingContainer.append(seeThroughRating);
    book.append(link, ratingContainer, price, addToCart);
    container.append(book);

  }

  addToCart(data)

}


function addToCart(data) {
  //Permite guardar libros en el carrito desde otras partes de la página
  let addToCartBtns = document.querySelectorAll('.buy-btn');
  console.log('Estos son los botónes de agregar al carrito', addToCartBtns);

  let CART = [];

  for (let i = 0; i < addToCartBtns.length; i++) {

    addToCartBtns[i].addEventListener('click', () => {

      // let quantity = 1;

      // if (CART.includes(data[i])) {
      //   data[i].quantity = quantity;
      //   console.log('Esta es la cantidad del libro', data[i].quantity);
      // } 

        CART.push(data[i]);
        window.localStorage.setItem('CART', JSON.stringify(CART));
        let carrito = JSON.parse(localStorage['CART']);
        console.log('Este es el array que se guarda en localStorage', carrito);
        console.log(CART);
      
    });

  }

}



// for(let i = 0; i < addToCartBtns.length; i++) {

//   addToCartBtns[i].addEventListener('click', () => {
//       let CART = [];
//       CART.push(data[i]);
//       console.log(CART);

//       // window.localStorage.setItem('CART', JSON.stringify(CART));
//       //  let carrito = JSON.parse(localStorage['CART']);
//       //  console.log(carrito);

//       // });

//   });

//   }