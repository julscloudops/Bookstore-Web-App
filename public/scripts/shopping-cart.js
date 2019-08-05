document.addEventListener('DOMContentLoaded', loadShoppingCart);

async function loadShoppingCart() {

  let carrito = JSON.parse(localStorage['CART']);

  if (carrito[0]._id != undefined) {
    for (let i = 0; i < carrito.length; i++) {
      let container = document.getElementById('carrito');
      let libro = document.createElement('div');
      let item = document.createElement('div');
      let imgContainer = document.createElement('div');
      let info = document.createElement('div');
      let link = document.createElement('a');
      let img = document.createElement('img');
      let title = document.createElement('h1');
      let isbn = document.createElement('p');
      let price = document.createElement('div');
      let quantity = document.createElement('div');
      let input = document.createElement('input');
      let subtotal = document.createElement('div');
      let removeBtn = document.createElement('div');
      let btn = document.createElement('button');

      libro.className = 'libro-carrito';
      item.className = 'item';
      imgContainer.className = 'product-image';
      img.className = 'product-frame';
      info.className = 'product-details';
      price.className = 'price';
      quantity.className = 'quantity';
      input.className = 'quantity-field';
      subtotal.className = 'subtotal';
      removeBtn.className = 'remove';

      link.href = `/libro/views/${carrito[i]._id}`;
      let imgSrc = await fetch(carrito[i].imgUrl);
      img.src = imgSrc.url;
      title.textContent = carrito[i].title;
      isbn.textContent = `ISBN: ${carrito[i].isbn}`;
      price.textContent = carrito[i].price;
      input.setAttribute('type', 'number');
      input.setAttribute('min', '1');
      input.value = 1;
      subtotal.textContent = carrito[i].price;
      btn.textContent = 'Eliminar';

      link.append(img);
      imgContainer.append(link);
      info.append(title, isbn);
      item.append(imgContainer, info, );
      quantity.append(input);
      removeBtn.append(btn);
      libro.append(item, price, quantity, subtotal, removeBtn);
      container.append(libro);

      updateQuantity();
      updateSumItems();
      updateCartTotal();


    }

    //Elimina un libro del carrito
    let removeBtn = document.querySelectorAll('.remove button');

    for (let i = 0; i < removeBtn.length; i++) {

      removeBtn[i].addEventListener('click', (event) => {
        let buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        let idLibro = removeBtn[i].parentElement.parentElement.children[0].children[0].children[0].href.slice(34);
        console.log(idLibro);

        //Elimina el id del libro del arreglo y luego lo guarda en localstorage
        carrito = carrito.filter(libro => libro._id != idLibro);
        console.table(carrito);

        window.localStorage.setItem('CART', JSON.stringify(carrito));

        updateQuantity();
        updateSumItems();
        updateCartTotal();


      });
    }

    function updateSumItems() {
      let sumItems = 0;
      let quantityInputs = document.querySelectorAll('.quantity input');
      console.log(quantityInputs)
      if (quantityInputs.length == 0) {
        let sumItems = 0;
        let totalItems = document.querySelector('.total-items');
        totalItems.textContent = `Libros en el carrito: ${sumItems}`;
      } else {
        for (input of quantityInputs) {
          sumItems += parseInt(input.value);
          let totalItems = document.querySelector('.total-items');
          totalItems.textContent = `Libros en el carrito: ${sumItems}`;
        }
      }

    }

    //Actualiza los precios
    function updateCartTotal() {
      let carritoContainer = document.getElementById('carrito');
      let bookRows = carritoContainer.getElementsByClassName('libro-carrito');
      let finalValue = document.querySelectorAll('.final-value');
      let total = 0;

      for (let i = 0; i < bookRows.length; i++) {
        let bookRow = bookRows[i];
        let priceElement = bookRow.getElementsByClassName('price')[0];
        let quantityElement = bookRow.querySelector('.quantity input');
        let price = parseFloat(priceElement.textContent);
        let quantity = quantityElement.value;
        total = total + (price * quantity);
      }

      for (let i = 0; i < finalValue.length; i++) {
        finalValue[i].textContent = total;
      }

    }



    function updateQuantity() {
      let quantityInputs = document.querySelectorAll('.quantity input');
      quantityInputs.forEach((input) => {

        input.addEventListener('change', () => {
          for (let i = 0; i < quantityInputs.length; i++) {

            //Calcula el precio de una fila
            let bookRow = input.parentElement.parentElement;
            let price = parseFloat(bookRow.getElementsByClassName('price')[0].textContent);
            let quantity = input.value;
            let rowPrice = price * quantity;
            /* Update line price display and recalc cart totals */
            bookRow.getElementsByClassName('subtotal')[0].textContent = rowPrice;
            updateSumItems();
            updateCartTotal();

          }

        })


      })


    }


  }

}