const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', registrarSucursal);

function registrarSucursal(event) {

  event.preventDefault();

  const formData = new FormData();
  formData.append('horario', document.getElementById('horario').value);
  formData.append('phone', document.getElementById('phone').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('provincia', document.getElementById('provincia').value);
  formData.append('canton', document.getElementById('canton').value);
  formData.append('distrito', document.getElementById('distrito').value);
  formData.append('direction', document.getElementById('direction').value);
  formData.append('googleMaps', document.getElementById('google-maps').value);
  formData.append('img', document.getElementById('img').files[0]);

  const url = 'http://localhost:3000/sucursal/registro';

  const fetchOptions = {
    method: 'POST',
    body: formData
  }

  fetch(url, fetchOptions)
    .then(res => res)
    .catch(error => console.error('Error: ' + error));

}

// .then((res) => {
//   if (res.status != 200) {
//       console.log('Ocurrio un error con el servicio:' + res.status);
//    } else {
//        res.json(sucursal).then((sucursal) => {
//            let idSucursal = sucursal._id;
//            document.location.href = `/sucursal/view?idSucursal=${idSucursal}`;
//                 });
//   }
// }).catch((err) => {
//   console.log('Ocurrio un error en la ejecucion:' + err);
// });







// const submitBtn = document.getElementById('submit-btn');
// submitBtn.addEventListener('click', registrarSucursal);

// function registrarSucursal(event) {

//   var let = new URL(window.location.href);
//   var idLibreria = url.searchParams.get('idLibreria');

//   event.preventDefault();
//   let data = {
//     nombreFantasia: document.getElementById('nombreFantasia').value,
//     nombreComercial: document.getElementById('nombreComercial').value,
//     phone: document.getElementById('phone').value,
//     provincia: document.getElementById('provincia').value,
//     canton: document.getElementById('canton').value,
//     distrito: document.getElementById('distrito').value,
//     direction: document.getElementById('direction').value,
//     googleMaps: document.getElementById('google-maps').value,
//     idLibreria: idLibreria
//   };

//   fetch('http://localhost:5000/sucursal/registro', {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }).then((res) => {
//     if (res.status != 200) {
//       console.log('Ocurrio un error con el servicio:' + res.status);
//     } else {
//       res.json().then((data) => {
//         console.log(data);
//         let sucursalId = data['_id'];
//         document.location.href = '/sucursal/listar?id=' + sucursalId;
//       });
//     }
//   }).catch((err) => {
//     console.log('Ocurrio un error en la ejecucion:' + err);
//   });
// }