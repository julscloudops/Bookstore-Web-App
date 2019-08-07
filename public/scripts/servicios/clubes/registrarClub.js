document.addEventListener('DOMContentLoaded', popularSelects);

const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', registrarClub);

async function popularSelects() {
  
  // const categoriaSelect = document.getElementById('type');
  const libreriaSelect = document.getElementById('libreria');
  const idLibreriaInput = document.getElementById('idLibreria');

  const sucursalSelect = document.getElementById('sucursal');
  const libroSelect = document.getElementById('libroPorLeer');


  const urlLibro = 'http://localhost:3000/libro/';
  const resLibros = await fetch(urlLibro);
  var libros = await resLibros.json();


  const urlLibrerias = 'http://localhost:3000/libreria/';
  const resLibreria = await fetch(urlLibrerias);
  var librerias = await resLibreria.json();

  const urlSucursal = 'http://localhost:3000/sucursal/';
  const resSucursal = await fetch(urlSucursal);
  var sucursales = await resSucursal.json();

  // const urlCategoria = 'http://localhost:3000/libro/categorias';
  // const resCategoria = await fetch(urlCategoria);
  // const categorias = await resCategoria.json();


  // let id = document.getElementById('idAutor');

   libroArr = [];

  for (let i = 0; i < libros.length; i++) {
    let option = document.createElement('option');
    option.textContent = libros[i].title;
    libroSelect.append(option);
  }

  // Popular libreria select
  for (let i = 0; i < librerias.length; i++) {
    let option = document.createElement('option');
    option.textContent = librerias[i].nombreFantasia;
    libreriaSelect.append(option);
  }

  libroSelect.addEventListener('change', () => {
    libros.forEach((libro) => {
      if (libro.title === libroSelect.value) {
        libroArr.splice(0, 1, libro);
        console.log(libroArr);
      }
    })
  });

  libreriaSelect.addEventListener('change', () => {
    librerias.forEach((libreria) => {
      if (libreria.nombreFantasia === libreriaSelect.value) {
        idLibreriaInput.value = `${libreria._id}`
      }

      sucursales.forEach((sucursal) => {
        if (sucursal.idLibreria == idLibreriaInput.value) {
          let option = document.createElement('option');
          option.textContent = sucursal.name;
          sucursalSelect.append(option);

        }
      });
    })
  });

   sucursalArr = [];

  sucursalSelect.addEventListener('change', () => {
    sucursales.forEach((sucursal) => {
      if (sucursal.name === sucursalSelect.value) {
        sucursalArr.splice(0, 1, sucursal);
        console.log(sucursalArr);
      }
    });
  });

}

function registrarClub() {
  
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('meetingDate', document.getElementById('meetingDate').value);
    // formData.append('categoria', document.getElementById('categoria').value);
    formData.append('libroPorLeer', JSON.stringify(libroArr));
    formData.append('meetingPlace', JSON.stringify(sucursalArr));
    formData.append('idLibreria', document.getElementById('idLibreria').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('img', document.getElementById('img').files[0]);

    const url = 'http://localhost:3000/club/registro';

    const fetchOptions = {
      method: 'POST',
      body: formData
    }

    fetch(url, fetchOptions)
      .then(res => {
        // window.location.href = res.url;
        console.log(res.url);
      })
      .catch(error => console.error('Error: ' + error));
  }