document.addEventListener('DOMContentLoaded', listarLibrosParaIntercambiar);

async function listarLibrosParaIntercambiar() {
  const url = 'http://localhost:3000/libros/librosNovedosos';
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);

  //Client-side rendering de los libros mas novedosos
  for (let i = 0; i < data.length; i++) {
    const container = document.getElementById('libros-usuario');
    const book = document.createElement('div');
    const link = document.createElement('a');
    const cover = document.createElement('img');
    const imgSrc = await fetch(data[i].imgUrl);
    const innerContainer = document.createElement('div');
    const seeThroughRating = document.createElement('div');
    const rating1 = document.createElement('button');
    const rating2 = document.createElement('button');
    const rating3 = document.createElement('button');
    const rating4 = document.createElement('button');
    const rating5 = document.createElement('button');
    const intercambioBtn = document.createElement('button');

    cover.src = imgSrc.url;
    link.href = `/libros/views/${data[i]._id}`;
    book.className = 'book';
    innerContainer.className = 'rating-holder';
    seeThroughRating.className = 'c-rating c-rating--big'
    intercambioBtn.className = 'exchange-btn';
    intercambioBtn.innerHTML = 'Intercambiar!';

    link.append(cover);
    seeThroughRating.append(rating1, rating2, rating3, rating4, rating5);
    innerContainer.append(seeThroughRating, intercambioBtn);
    book.append(link, innerContainer);
    container.append(book);
  }

}