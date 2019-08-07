document.addEventListener('DOMContentLoaded', listarLibrerias);

async function listarLibrerias() {

  const url = '/libreria/';
  const res = await fetch(url);
  const librerias = await res.json();
  console.log(librerias);

  for(let i = 0; i < librerias.length; i++){
  //Client-side rendering de los librerias 
  const libreriasContainer = document.getElementById('librerias-container');
  const libreria = document.createElement('div');
  const name = document.createElement('span');
  const link = document.createElement('a');
  const img = document.createElement('img');
  const imgSrc = await fetch(librerias[i].imgUrl); 

  name.textContent = librerias[i].nombreFantasia;  
  link.href = `/libreria/views?id=${librerias[i]._id}`;
  img.src = imgSrc.url;

  libreria.className = 'libreria';
  name.className = 'name';
  img.className = 'img';

  link.append(img);
  libreria.append(name, link);
  libreriasContainer.append(libreria);


  }


}



