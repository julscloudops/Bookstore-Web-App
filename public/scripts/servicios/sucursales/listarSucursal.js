document.addEventListener('DOMContentLoaded', listarSucursal);

async function listarSucursal() {

//Window.location nos da el URL en el que estamos, utilizo splice para recuperar el ID de un libro específico

  let idSucursal = window.location.pathname.slice(16);
  console.log(idSucursal);

  const url = `/sucursal/JSON/${idSucursal}`;
  console.log(url);
  
  const res = await fetch(url);

  const sucursal = await res.json();

  console.log(sucursal);

}