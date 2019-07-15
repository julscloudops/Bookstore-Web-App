const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', registrarLibro);

function registrarLibro(event) {

  event.preventDefault();

const formData = new FormData();
formData.append('author', document.getElementById('author').value);
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
.then(res => res.json())
.then(res => console.log('Sucess:', JSON.stringify(res)))
.catch(error => console.error('Error:', error));

}



