document.addEventListener('DOMContentLoaded', visualizarPerfil);

async function visualizarPerfil() {
 
  const url = 'http://localhost:3000/usuario/perfil/id';

  const res = await fetch(url);
  const data = await res.json();

  console.log(data);

  console.log(`Esta es la información del usuario ${data}`)

  //Client-side rendering del perfil individual
    const container = document.getElementById('user-profile'); 
    const cover = document.createElement('img');  
    const name = document.createElement('p');

    const ratingContainer = document.createElement('div');
    const seeThroughRating = document.createElement('div');
    const rating1 = document.createElement('button');
    const rating2 = document.createElement('button');
    const rating3 = document.createElement('button');
    const rating4 = document.createElement('button');
    const rating5 = document.createElement('button');

    const description = document.createElement('p');

   
    name.textContent = data.firstName + ' '  + data.lastName;
    description.textContent = data.description;
    const imgSrc = await fetch(data.imgUrl);
    cover.src = imgSrc.url;


    cover.className = 'profile-pic';
    name.className = 'username';
    description.className = 'description';
    ratingContainer.className = 'rating-holder';
    seeThroughRating.className = 'c-rating c-rating--big';

    seeThroughRating.append(rating1, rating2, rating3, rating4, rating5);
    ratingContainer.append(seeThroughRating);
    container.append(cover, name, ratingContainer, description);
  

}
