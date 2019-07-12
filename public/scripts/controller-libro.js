const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', postLibro);

function postLibro(event) {

//Evita que el evento
event.preventDefault();

let data = {
  title: document.getElementById('title').value,
  author: document.getElementById('author').value,
  ISBN: document.getElementById('ISBN').value,
  genre: document.getElementById('genre').value,
  editorial: document.getElementById('editorial').value,
  price: document.getElementById('price').value,
  description: document.getElementById('description').value
};

  fetch('http://localhost:8080/libro/registro', {
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