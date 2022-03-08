const linkFavoritas = document.getElementById("favoritas");

function peliFavorita(id) {
  
  let pelisFavoritas = localStorage.getItem('pelisFavoritas');
  if(pelisFavoritas !== null) {
    let arr = pelisFavoritas.split(',');
    arr.push(id);
    localStorage.setItem('pelisFavoritas', arr);
    console.log(localStorage.pelisFavoritas);
  } else {
    localStorage.setItem('pelisFavoritas', id);
    console.log(localStorage.pelisFavoritas);
  }
  linkFavoritas.innerHTML = '<a href="favoritas.html">Peliculas Favoritas</a>';
  
}

function favoritas(id) {
  return '<div class="ec-stars-wrapper">' +
  `<a href="#" onclick="peliFavorita(${id})">&#9733;</a>`+
'</div>'
}

window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);


  if(localStorage.getItem('pelisFavoritas') !== null) {
    linkFavoritas.innerHTML = '<a href="favoritas.html">Peliculas Favoritas</a>';
  }

  fetch("http://localhost:3031/api/movies/")
    .then(function (response) {
      return response.json();
    })
    .then(function (peliculas) {
      let data = peliculas.data;
      
      data.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        container.appendChild(card);

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;
        card.appendChild(h1);
        

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;
        card.appendChild(p);

        if (movie.length !== null) {
          const duracion = document.createElement("p");
          duracion.textContent = `Duración: ${movie.length}`;
          card.appendChild(duracion);
        }   
        
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }

        const favoritas = document.createElement("p");
        favoritas.innerHTML = this.favoritas(movie.id);
        card.appendChild(favoritas);
                
      });
    })
    .catch(function (error) {
      console.error(error);
    });
};
