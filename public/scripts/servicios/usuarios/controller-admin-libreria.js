const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', postAdminLibreria);

function postAdminLibreria(event) {

//Evita que el evento
event.preventDefault();

  let data = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    birthDate: document.getElementById('birthDate').value,
    gender: document.getElementById('gender').value,
    idType: document.getElementById('idType').value,
    id: document.getElementById('id').value,
    provincia: document.getElementById('provincia').value,
    canton: document.getElementById('canton').value,
    distrito: document.getElementById('distrito').value,
    direction: document.getElementById('direction').value
  };


  fetch('http://localhost:3000/admin-libreria/registro', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.status != 200)
        console.log('Ocurrió un error con el servicio: ' + res.status);
      else
        return res.json();
    })
    .catch(
      function (err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    );
}