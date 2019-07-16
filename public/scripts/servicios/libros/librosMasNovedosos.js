async function listarLibrosNovedosos() {

  const url = 'http://localhost:3000/libros/';

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);

  //Se hace un fetch para obtener el URL de cada imagen

  //Client-side rendering del catalogo
  for (i = 0; i < 3; i++) {
    const list = document.getElementById('list');
    const book = document.createElement('li');
    const link = document.createElement('a');
    const cover = document.createElement('img');
    const imgSrc = await fetch(data[i].imgUrl);    
    cover.src = imgSrc.url;
    book.className = 'book';
    link.append(cover);
    book.append(link);
    list.append(book);
  }


}