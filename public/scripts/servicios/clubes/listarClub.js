document.addEventListener('DOMContentLoaded', listarClub);
let url = new URL(window.location.href);
let idClub = url.searchParams.get('id');

async function listarClub() {
  const url = `http://localhost:3000/club/JSON/${idClub}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log('Esta es la información del club', data);

  //Se crean los elementos
  let root = document.getElementById('root');
  let club = document.createElement('div');
  let link = document.createElement('a');
  let img = document.createElement('img');
  let name = document.createElement('p');
  let meetingDate = document.createElement('p');
  let meetingDateLabel = document.createElement('p');
  let categoria = document.createElement('p');
  let descriptionLabel = document.createElement('p');
  let description = document.createElement('p');

  //Segundo contenedor
  let sideContainer = document.getElementById('sideContainer');
  let container = document.createElement('div');
  let libro = document.createElement('div');
  let libroLabel = document.createElement('p');
  let linkLibro = document.createElement('a');
  let cover = document.createElement('img');
  let ratingContainer = document.createElement('div');
  let seeThroughRating = document.createElement('div');
  let rating1 = document.createElement('button');
  let rating2 = document.createElement('button');
  let rating3 = document.createElement('button');
  let rating4 = document.createElement('button');
  let rating5 = document.createElement('button');

  let number = document.createElement('span');
  let numberLabel = document.createElement('p');
  let locationLabel = document.createElement('p');
  // let location = document.createElement('div');

  //Se agregan atributos
  linkLibro.href = `/libro/views/${data.libroPorLeer[0]._id}`;
  let imgSrcLibro = await fetch(data.libroPorLeer[0].imgUrl);
  cover.src = imgSrcLibro.url;
  libro.className = 'book';
  libroLabel.className = 'club-label';
  libroLabel.textContent = 'Libro a discutir';
  ratingContainer.className = 'rating-holder';
  seeThroughRating.className = 'c-rating c-rating--big'
 
  club.className = 'club';
  container.className = 'innerContainer';

  img.className = 'club-img';
  name.className = 'club-label';
  meetingDateLabel.className = 'club-label';
  meetingDate.className = 'club-text';
  descriptionLabel.className = 'club-label';
  description.className = 'club-description';
  numberLabel.className = 'club-label';
  number.className = 'club-sucursal-number';
  locationLabel.className = 'club-label';

  link.href = `/club/views?id=${data._id}`;
  let imgSrc = await fetch(data.imgUrl);
  img.src = imgSrc.url;

  meetingDateLabel.textContent = 'Fecha de reunión';
  meetingDate.textContent = data.meetingDate;
  categoria.textContent = data.categoria;
  descriptionLabel.textContent = 'Descripción';
  description.textContent = data.description;
  name.textContent = data.name;
  number.textContent = data.meetingPlace[0].phone;
  numberLabel.textContent =  data.meetingPlace[0].name;
  locationLabel.textContent = 'Ubicación';

  link.append(img);
  club.append(link, name, meetingDateLabel, meetingDate, descriptionLabel, description);

  linkLibro.append(cover);
  seeThroughRating.append(rating1, rating2, rating3, rating4, rating5);
  ratingContainer.append(seeThroughRating);
  libro.append(linkLibro, ratingContainer);
  container.append(libroLabel, libro, numberLabel, number, locationLabel);
  sideContainer.insertBefore(container, sideContainer.firstChild);
  root.insertBefore(club, root.firstChild);

  let mapsUrl = data.meetingPlace[0].googleMaps;
  window.localStorage.setItem('mapsUrl', mapsUrl);
}

function initMap() {
  //Google Maps
    let mapsUrl = window.localStorage.getItem('mapsUrl');
  //Extrae la lat y lng de un url
  var longlat = /\/\@(.*),(.*),/.exec(mapsUrl);
  //Strings.
  var lat = longlat[1]; //63.6741553
  var lng = longlat[2]; //-164.9587713
  //Convierte los Strings en numeros.
  var latParsed = parseFloat(lat);
  var lngParsed = parseFloat(lng);
  console.log(latParsed, lngParsed);
  var meetingLocation = {
    lat: latParsed,
    lng: lngParsed
  };
  console.log(latParsed, lngParsed);
  var map = new google.maps.Map(
    document.getElementById('google-maps'), {
      zoom: 15,
      center: meetingLocation
    });

  // The marker, positioned at sucursal
  var marker = new google.maps.Marker({
    position: meetingLocation,
    map: map
  });

}