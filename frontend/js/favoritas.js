function borrarFavorita(id) {
  
  let pelisFavoritas = localStorage.getItem('pelisFavoritas');
  if(pelisFavoritas !== null) {
    let arr = pelisFavoritas.split(',');
    let arrFiltrado = arr.filter(pelicula => {
      return pelicula != id
    })
    if(arrFiltrado.length >= 1){
      localStorage.setItem('pelisFavoritas', arrFiltrado);  
      location.reload()
    } else {
      localStorage.removeItem('pelisFavoritas');
      location.reload()
    }
  } else {
    localStorage.removeItem('pelisFavoritas');
    console.log(localStorage.pelisFavoritas);
  }
  
}


window.onload = () => {

  const container = document.querySelector(".container");

  // Aqui debemos agregar nuestro fetch

  let str = localStorage.getItem('pelisFavoritas');

  if(str !== null){
    let arr = str.split(',');

    let favoritas = Array.from(new Set(arr));

    favoritas.forEach((id) => {
      fetch(`http://localhost:3031/api/movies/${id}/`)
        .then(function (response) {
          return response.json();
        })
        .then(function (peli) {
  
          let movie = peli.data;
  
          const card = document.createElement("div");
          card.setAttribute("class", "card");
          container.appendChild(card);
  
          const h1 = document.createElement("h1");
          h1.textContent = movie.title;
          card.appendChild(h1);
  
          const p = document.createElement("p");
          p.textContent = `Rating: ${movie.rating}`;
          card.appendChild(p);
  
          const duracion = document.createElement("p");
          if(movie.length !== null){
            duracion.textContent = `Duración: ${movie.length}`;            
          } else {
            duracion.innerHTML = "Duración: -";            
          }
          card.appendChild(duracion);
  
          const genero = document.createElement("p");
          if (movie.genre !== null) {
            console.log(movie.genre);
            genero.textContent = `Genero: ${movie.genre.name}`;
          } else {
            genero.textContent = "Genero: -";
          }  
          card.appendChild(genero);

          const borrar = document.createElement("p");
          if (movie.genre !== null) {
            console.log(movie.genre);
            genero.innerHTML = `<button onclick="borrarFavorita(${movie.id})">Eliminar Favorito</button>`;
          } else {
            genero.textContent = "Genero: -";
          }  
          card.appendChild(genero);
          
        })
        .catch(function (error) {
          console.error(error);
        });
    });

  } else {

    const divSinFAv = document.createElement("div");
    container.appendChild(divSinFAv);

    const h2 = document.createElement("h2");
    h2.innerHTML = "No tienes peliculas favoritas";
    divSinFAv.appendChild(h2);

    const a = document.createElement("a");
    a.setAttribute("href", "home.html");
    a.innerHTML = "Volver al listado de peliculas";
    divSinFAv.appendChild(a);

  }
  


};
