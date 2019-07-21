const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', userLogout);


function cerrarSesion(){

  const url = 'http://localhost:3000/usuario/logout';

  const fetchOptions = {
    method: 'POST'
  }

fetch(url, fetchOptions)
.then(res => {
  console.log(res)
}).then(err => {
  console.log(err)
});


}
