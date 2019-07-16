const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', registrarAdminGlobal);

function registrarAdminGlobal(event) {

  event.preventDefault();

  let data = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value
}

const url = 'http://localhost:3000/admin-global/registro';

const fetchOptions = {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
}

fetch(url, fetchOptions)
  .catch(error => console.log('Error:', error))
  .then((res) => {
    let redirect = 'http://localhost:3000/registro-exitoso.html';
    window.location = redirect;
  });

}