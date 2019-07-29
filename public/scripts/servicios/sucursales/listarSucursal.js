document.addEventListener('DOMContentLoaded', listarSucursal);

let idSucursal = window.location.pathname.slice(16);
console.log(idSucursal);

async function listarSucursal() {

  const url = `/sucursal/JSON/${idSucursal}`;

  const res = await fetch(url);
  const data = await res.json();

  console.log(data);

  const infoContainer = document.getElementById('sucursal-info');
  let link = document.createElement('a');
  let img = document.createElement('img');
  let imgSrc = await fetch(data.imgUrl);
  img.src = imgSrc.url;
  link.href = `/sucursal/views/${data._id}`;

  // let horario = document.createElement('p');
  // let phone = document.createElement('p');

  // horario.innerHTML = `Horario:<br> ${data.horario}`;
  // horario.className = 'sucursal-info-txt'
  // phone.innerHTML = `Teléfono: ${data.phone}`;
  // phone.className = 'sucursal-info-txt';

  link.append(img);
  infoContainer.append(link);

  let mapsUrl = data.googleMaps;

  initMaps(mapsUrl);



}


function initMaps(mapsUrl) {
  //Google Maps
  googleMapsUrl = mapsUrl;
  console.log(googleMapsUrl);
  //Extrae la lat y lng de un url
  var longlat = /\/\@(.*),(.*),/.exec(googleMapsUrl);
  //Strings.
  var lat = longlat[1]; //63.6741553
  var lng = longlat[2]; //-164.9587713
  //Convierte los Strings en numeros.
  var latParsed = parseFloat(lat);
  var lngParsed = parseFloat(lng);
  console.log(latParsed, lngParsed);
  var sucursal = {
    lat: latParsed,
    lng: lngParsed
  };
  console.log(latParsed, lngParsed);
  var map = new google.maps.Map(
    document.getElementById('google-maps'), {
      zoom: 15,
      center: sucursal
    });

  // The marker, positioned at sucursal
  var marker = new google.maps.Marker({
    position: sucursal,
    map: map
  });


}