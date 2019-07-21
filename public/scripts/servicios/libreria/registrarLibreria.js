const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', registrarLibreria);

function registrarLibreria(event) {

  event.preventDefault();

const formData = new FormData();

formData.append('nombreFantasia', document.getElementById('nombreFantasia').value);
formData.append('nombreComercial', document.getElementById('nombreComercial').value);
formData.append('description', document.getElementById('description').value);
formData.append('provincia', document.getElementById('provincia').value);
formData.append('canton', document.getElementById('canton').value);
formData.append('distrito', document.getElementById('distrito').value);
formData.append('direction', document.getElementById('direction').value);
formData.append('img', document.getElementById('img').files[0]);

const url = 'http://localhost:3000/libreria/registro';

  const fetchOptions = {
      method: 'POST',
      body: formData
  }
     
fetch(url, fetchOptions)
.catch(error => console.log('Error:', error))
.then((res) => {
  let redirect = 'http://localhost:3000/usuario/inicio';
  window.location = redirect;
});

}



