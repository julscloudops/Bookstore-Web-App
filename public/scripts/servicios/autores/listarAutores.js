document.addEventListener('DOMContentLoaded', listarAutores);

async function listarAutores() {

  const url = '/autor';
  const res = await fetch(url);
  const autores = await res.json();
  console.log(autores);

  for(let i = 0; i < autores.length; i++){
  //Client-side rendering de los autores 
  const autorContainer = document.getElementById('autores-container');
  const autor = document.createElement('div');
  const name = document.createElement('span');
  const link = document.createElement('a');
  const img = document.createElement('img');
  const imgSrc = await fetch(autores[i].imgUrl); 

  name.textContent = autores[i].name;  
  link.href = `/autor/views/${autores[i]._id}`;
  img.src = imgSrc.url;

  autor.className = 'autor';
  name.className = 'name';
  img.className = 'img';

  link.append(img);
  autor.append(name, link);
  autorContainer.append(autor);


  }


}



