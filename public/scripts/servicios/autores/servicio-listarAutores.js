document.addEventListener('DOMContentLoaded', listarAutores);

async function listarAutores () {

  url = 'http://localhost:3000/autor/';

  const res = await fetch(url);
  const data = await res.json();

  console.log(data);

}