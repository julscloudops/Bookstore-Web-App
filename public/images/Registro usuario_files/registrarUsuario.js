const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', registrarUsuario);

function registrarUsuario(event) {

  event.preventDefault();

const formData = new FormData();

formData.append('firstName', document.getElementById('firstName').value);
formData.append('lastName', document.getElementById('lastName').value);
formData.append('email', document.getElementById('email').value);
formData.append('phone', document.getElementById('phone').value);
formData.append('birthDate', document.getElementById('birthDate').value);
formData.append('gender', document.getElementById('gender').value);
formData.append('idType', document.getElementById('idType').value);
formData.append('id', document.getElementById('id').value);
formData.append('provincia', document.getElementById('provincia').value);
formData.append('canton', document.getElementById('canton').value);
formData.append('distrito', document.getElementById('distrito').value);
formData.append('direction', document.getElementById('direction').value);
formData.append('img', document.getElementById('img').files[0]);

const url = 'http://localhost:3000/usuario/registro';

  const fetchOptions = {
      method: 'POST',
      body: formData
  }
     
fetch(url, fetchOptions)
.then(res => res.json())
.catch(error => console.errors('Error:', error) )
.then(res => console.log('Sucess:', JSON.stringify(res)));

}



