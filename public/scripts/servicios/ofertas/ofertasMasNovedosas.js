document.addEventListener('DOMContentLoaded', listarOfertasMasNovedosas);

async function listarOfertasMasNovedosas() {

  const url = 'http://localhost:3000/oferta/ofertasNovedosas';
  const res = await fetch(url);
  const ofertas = await res.json();
  console.log(ofertas);

  //Client-side rendering de las ofertas mas novedosas
    let ofertas1 = document.getElementById('ofertas1');
    let ofertas2 = document.getElementById('ofertas2');
    let ofertas3 = document.getElementById('ofertas3');

    let img1 = document.createElement('img');
    let img2 = document.createElement('img');
    let img3 = document.createElement('img');

    let link1 = document.createElement('a');
    let link2 = document.createElement('a');
    let link3 = document.createElement('a');

    link1.href = `/libreria/views/${ofertas[0].idLibreria}`;
    link2.href = `/libreria/views/${ofertas[1].idLibreria}`;
    link3.href = `/libreria/views/${ofertas[2].idLibreria}`;

    let imgSrc1 = await fetch(ofertas[0].imgUrl);
    let imgSrc2 = await fetch(ofertas[1].imgUrl);
    let imgSrc3 = await fetch(ofertas[2].imgUrl);

    img1.src = imgSrc1.url;
    img2.src = imgSrc2.url;
    img3.src = imgSrc3.url;
    
    link1.append(img1);
    link2.append(img2);
    link3.append(img3);

    ofertas1.append(link1);
    ofertas2.append(link2);
    ofertas3.append(link3);


}