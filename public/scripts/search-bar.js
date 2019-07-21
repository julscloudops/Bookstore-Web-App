const searchBtn = document.getElementById('search-btn');
const search = document.getElementById('search');
const tip = document.getElementById('tip');

var i = 0;
var message = "Busca tus libros favoritos!";
var speed = 100;

searchBtn.addEventListener("mouseover", () => {
  search.focus();
  typeWriter();
});

function typeWriter() {
  if (i < message.length) {
    msg = search.getAttribute('placeholder') + message.charAt(i);
    search.setAttribute('placeholder', msg);
    i++;
    setTimeout(typeWriter, speed);
  }
}

search.addEventListener('keydown', () => {
  tip.style.visibility = 'visible';
  tip.style.opacity = '1';
});

const logo = document.getElementById('logoNavbar');

logo.addEventListener('click', () => {
window.location.href = 'http://localhost:3000/usuario/inicio';

});