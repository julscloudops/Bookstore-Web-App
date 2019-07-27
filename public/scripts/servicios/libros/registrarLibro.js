// const submitBtn = document.getElementById('submit');
// submitBtn.addEventListener('click', registrarLibro);

let btnCategoria = document.getElementById('registrar-categoria');
let btnEditorial = document.getElementById('registrar-editorial');

let modalCategoria = document.getElementById('modal-categoria');
let modalEditorial = document.getElementById('modal-editorial');

let btnCancelCategoria = document.getElementById('btn-cancel-categoria');
let btnCancelEditorial = document.getElementById('btn-cancel-editorial');
let btnConfirmCategoria = document.getElementById('btn-confirm-categoria');
let btnConfirmEditorial = document.getElementById('btn-confirm-editorial');

let backdrop = document.querySelector('.backdrop');

btnConfirmCategoria.addEventListener('click', registrarCategoria);
btnConfirmEditorial.addEventListener('click', registrarEditorial);

btnCancelCategoria.addEventListener('click', (event) => {
  modalCategoria.style.display = 'none';
  backdrop.style.display = 'none';
});
btnConfirmCategoria.addEventListener('click', (event) => {
  modalCategoria.style.display = 'none';
  backdrop.style.display = 'none';
});
btnCancelEditorial.addEventListener('click', (event) => {
  modalEditorial.style.display = 'none';
  backdrop.style.display = 'none';
});
btnConfirmEditorial.addEventListener('click', (event) => {
  modalEditorial.style.display = 'none';
  backdrop.style.display = 'none';
});

btnCategoria.addEventListener('click', (event) => {
  modalCategoria.style.display = 'block';
  backdrop.style.display = 'block';

});

btnEditorial.addEventListener('click', (event) => {
  modalEditorial.style.display = 'block';
  backdrop.style.display = 'block';

});

function registrarCategoria() {
  let select = document.getElementById('genre');
  let option = document.createElement('option');
  let input = document.getElementById('categoria-input');

  option.innerHTML = input.value;
  option.value = input.value;
  select.append(option);

}

function registrarEditorial() {
  let select = document.getElementById('editorial');
  let option = document.createElement('option');
  let input = document.getElementById('input-editorial');

  option.innerHTML = input.value;
  option.value = input.value;
  select.append(option);

}




// function registrarCategoria(){
//   let categoria = document.getElementById('registrar-categoria');

//   if(document.forms[0].genre.options[document.forms[0].genre.selectedIndex].value=="selectCat"){
//     category.className ="showCat";
//   }else{
//     category.className = "inputCat";
//   } if(document.forms[0].editorial.options[document.forms[0].editorial.selectedIndex].value=="selectEdi"){
//     editorials.className = "showEdi";
//   }else{
//     editorials.className = "inputEdi";
//   }
// }

// function registrarEditorial(){
//   let editorial = document.getElementById('registrar-categoria');

// }




// function registrarLibro(event) {

//   event.preventDefault();

// const formData = new FormData();
// formData.append('author', document.getElementById('author').value);
// formData.append('price', document.getElementById('price').value);
// formData.append('title', document.getElementById('title').value);
// formData.append('isbn', document.getElementById('isbn').value);
// formData.append('genre', document.getElementById('genre').value);
// formData.append('editorial', document.getElementById('editorial').value);
// formData.append('description', document.getElementById('description').value);
// formData.append('img', document.getElementById('img').files[0]);

// const url = 'http://localhost:3000/libros/registro';

//   const fetchOptions = {
//       method: 'POST',
//       body: formData
//   }

// fetch(url, fetchOptions)
// .then(res => res)
// .catch(error => console.error('Error: ' + error));

// }