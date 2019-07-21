document.addEventListener('DOMContentLoaded', listarLibro);

async function listarLibro() {

//Window.location nos da el URL en el que estamos, utilizo splice para recuperar el ID de un libro específico
  const idLibro = window.location.pathname.slice(14);
  console.log(idLibro);

  const url = `/libros/json/${idLibro}`;
  console.log(url);
  
  const res = await fetch(url);

  const data = await res.json();

  console.log(data);

}