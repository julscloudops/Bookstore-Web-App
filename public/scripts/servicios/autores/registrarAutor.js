const submitBtn = document.getElementById('submit');
submitBtn.addEventListener("click", postAutor);

function postAutor(event) {

  event.preventDefault();

  var formData = new FormData();

  formData.append('name', document.getElementById('name').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('img', document.getElementById('img').files[0]);

  const url = 'http://localhost:3000/autor/registro';

  const fetchOptions = {
    method: 'POST',
    body: formData
  }

  fetch(url, fetchOptions)
.then(res => res.json())
.catch(error => console.errors('Error:', error) )
.then(res => console.log('Sucess:', res));

  };