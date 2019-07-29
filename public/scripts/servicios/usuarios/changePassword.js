const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', changePassword);

let newPass = document.getElementById('newPass');
let confirmPass = document.getElementById('confirmPass');

function changePassword(event) {

  event.preventDefault();

  if (newPass.value.trim() &&
    confirmPass.value.trim() !== "" &&
    newPass.value === confirmPass.value) {

    let data = {
      newPass: newPass.value
    }

    const url = 'http://localhost:3000/usuario/change-password';

    const fetchOptions = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(url, fetchOptions)
      .then((res) => {
          document.location.href = 'http://localhost:3000/usuario/login';
      }).catch(error => console.error('Error: ' + error));

  }


}