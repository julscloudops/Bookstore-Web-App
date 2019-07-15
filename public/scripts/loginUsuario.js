const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', loginUsuario);

function loginUsuario(event) {

  event.preventDefault();

  let data = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };
  
  const url = 'http://localhost:3000/usuario/login';

  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  fetch(url, fetchOptions)
    .then(res => res.json())
    .then(res => console.log('Sucess:', res))
    .catch(error => console.error('Error:', error));

}