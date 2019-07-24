// let fadeTime = 300;

document.addEventListener('DOMContentLoaded', updateSumItems);
function updateSumItems() {
  let sumItems = 0;
  let quantityInputs = document.querySelectorAll('.quantity input');
  for (input of quantityInputs) {
    sumItems += parseInt(input.value);
    let totalItems = document.querySelector('.total-items');
    totalItems.textContent= `Libros en el carrito: ${sumItems}`;
  }
}

//Elimina un libro del carrito
let removeBtn = document.querySelectorAll('.remove button');
for(let i = 0; i < removeBtn.length; i++){
  let button = removeBtn[i];
  button.addEventListener('click', (event) => {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
  })
}

function updateCartTotal() {
let carritoItemContainer = document.getElementsByClassName('carrito')[0];
let cartRows = carritoItemContainer.getElementsByClassName('libro-carrito');
let total = 0;
for(let i = 0; i < cartRows.length; i++){
  let cartRow = cartRows[i];
  let priceElement = cartRow.getElementsByClassName('price')[0];
  let quantityElement = cartRow.querySelector('.quantity input');
  let price = parseFloat(priceElement.innerText);
  let quantity = quantityElement.value; 
  total = total + (price * quantity);

}

document.querySelectorAll('.final-value').innerText = total;


}


// let quantityInputs = document.querySelectorAll('.quantity input');
// quantityInputs.addEventListener('change', updateQuantity);

// function updateQuantity(quantityInput) {
//   /* Calculate line price */
//   let productRow = $(quantityInput).parent().parent();
//   let price = parseFloat(productRow.children('.price').text());
//   let quantity = $(quantityInput).value;
//   let linePrice = price * quantity;

//   /* Update line price display and recalc cart totals */
//   productRow.children('.subtotal').each(function() {
//     $(this).fadeOut(fadeTime, function() {
//       $(this).text(linePrice.toFixed(2));
//       recalculateCart();
//       $(this).fadeIn(fadeTime);
//     });
//   });



// function removeItem(removeButton) {
//   /* Remove row from DOM and recalc cart total */
//   let productRow = $(removeButton).parent().parent();
//   productRow.slideUp(fadeTime, function() {
//     productRow.remove();
//     recalculateCart();
//     updateSumItems();
//   });
// }


// //Recalcular carrito
// function recalculateCart(onlyTotal) {
//   let subtotal = 0;

//   /* Sum up row totals */
//   document.querySelectorAll('.libros-carrito').each(function() {
//     subtotal += parseFloat($(this).children('.subtotal').text());
//   });

//   /* Calculate totals */
//   let total = subtotal;

//   /*If switch for update only total, update only total display*/
//   if (onlyTotal) {
//     /* Update total display */
//     document.querySelector('.total-value').fadeOut(fadeTime, function() {
//       document.querySelector('#basket-total').html(total.toFixed(2));
//       document.querySelector('.total-value').fadeIn(fadeTime);
//     });
//   } else {
//     /* Update summary display. */
//     document.querySelector('.final-value').fadeOut(fadeTime, function() {
//       document.querySelector('#basket-subtotal').html(subtotal.toFixed(2));
//       document.querySelector('#basket-total').html(total.toFixed(2));
//       if (total == 0) {
//         document.querySelector('.checkout-cta').fadeOut(fadeTime);
//       } else {
//         document.querySelector('.checkout-cta').fadeIn(fadeTime);
//       }
//       document.querySelector('.final-value').fadeIn(fadeTime);
//     });
//   }
// }


//   productRow.find('.item-quantity').text(quantity);
//   updateSumItems();
// }


