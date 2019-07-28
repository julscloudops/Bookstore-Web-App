const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', changePassword);


let generatedPass = document.getElementById('generatedPass');
let newPass = document.getElementById('newPass');
let confirmPass = document.getElementById('confirmPass');


function checkInput() {
  if (generatedPass.value.trim() &&
    newPass.value.trim() &&
    confirmPass.value.trim() !== "" &&
    newPass.value === confirmPass.value) {
     alert('Envie!');
  } 
}

function changePassword(event) {

  event.preventDefault();

  const formData = new FormData();

  formData.append('generatedPass', generatedPass.value);
  formData.append('newPass', newPass.value);
  formData.append('confirmPass', confirmPass.value);


  const url = 'http://localhost:3000/usuario/change-password';

  const fetchOptions = {
    method: 'POST',
    body: formData
  }

  fetch(url, fetchOptions)
    .catch(error => console.log('Error:', error))
    .then((res) => {
      console.log(res);
      // let redirect = 'http://localhost:3000/registro-exitoso.html';
      // window.location = redirect;
    });

}