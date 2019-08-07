document.addEventListener('DOMContentLoaded', listarAutoresSelect);

const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', registrarLibro);

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
  event.preventDefault();
  modalCategoria.style.display = 'none';
  backdrop.style.display = 'none';
});
btnConfirmCategoria.addEventListener('click', (event) => {
  event.preventDefault();
  modalCategoria.style.display = 'none';
  backdrop.style.display = 'none';
});
btnCancelEditorial.addEventListener('click', (event) => {
  event.preventDefault();
  modalEditorial.style.display = 'none';
  backdrop.style.display = 'none';
});
btnConfirmEditorial.addEventListener('click', (event) => {
  event.preventDefault();
  modalEditorial.style.display = 'none';
  backdrop.style.display = 'none';
});

document.addEventListener('keydown', () => {
  if (event.keyCode == 27) {
    modalCategoria.style.display = 'none';
    modalEditorial.style.display = 'none';
    backdrop.style.display = 'none';

  }
});

btnCategoria.addEventListener('click', (event) => {
  event.preventDefault();
  modalCategoria.style.display = 'block';
  backdrop.style.display = 'block';

});

btnEditorial.addEventListener('click', (event) => {
  event.preventDefault();
  modalEditorial.style.display = 'block';
  backdrop.style.display = 'block';

});


function registrarCategoria(event) {
  event.preventDefault();
  let select = document.getElementById('genre');
  let option = document.createElement('option');
  let input = document.getElementById('categoria-input');
  option.innerHTML = input.value;
  option.value = input.value;
  select.append(option);
}

function registrarEditorial(event) {
  event.preventDefault();
  let select = document.getElementById('editorial');
  let option = document.createElement('option');
  let input = document.getElementById('editorial-input');

  option.innerHTML = input.value;
  option.value = input.value;
  select.append(option);

}



async function listarAutoresSelect() {

  let autorSelect = document.getElementById('author');
  let idAutor = document.getElementById('idAutor');

  const url = '/autor';
  const res = await fetch(url);
  const autores = await res.json();
  console.log(autores);

  for (let i = 0; i < autores.length; i++) {
    let option = document.createElement('option');
    option.textContent = autores[i].name;
    autorSelect.append(option);
  }

  autorSelect.addEventListener('change', () => {
    autores.forEach((autor) => {
      if (autor.name === autorSelect.value) {
        idAutor.value = `${autor._id}`
        console.log(idAutor.value);
      }
    })
  });
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






function registrarLibro() {
  const formData = new FormData();
  formData.append('author', document.getElementById('author').value);
  formData.append('idAutor', document.getElementById('idAutor').value);
  formData.append('price', document.getElementById('price').value);
  formData.append('title', document.getElementById('title').value);
  formData.append('isbn', document.getElementById('isbn').value);
  formData.append('genre', document.getElementById('genre').value);
  formData.append('editorial', document.getElementById('editorial').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('img', document.getElementById('img').files[0]);

  const url = 'http://localhost:3000/libro/registro';

  const fetchOptions = {
    method: 'POST',
    body: formData
  }

  fetch(url, fetchOptions)
    .then(res => {
     window.location.href = res.url;
     console.log(res.url);
    })
    .catch(error => console.error('Error: ' + error));

}