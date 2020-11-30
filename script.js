// Called whe the page is loaded
window.onload = () => {
  getOriginals();
  getTrendingNow();
  getTopRated();
  getGenres();
};

const api_key = "bb3371dce253d99f5d38531c44cefec8";

const getMovieTrailer = async(id) =>  {
  var url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`;
  return await fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("something went wrong");
    }
  });
}

const getMovieInfo = async(id) => {
  var url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`;
  return await fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("something went wrong");
    }
  });
}

const setTrailer = (trailers) => {
  const iframe = document.getElementById("movieTrailer");
  const movieNotFound = document.querySelector(".movieNotFound");
  if (trailers.length > 0) {
    movieNotFound.classList.add("d-none");
    iframe.classList.remove("d-none");
    iframe.src = `https://www.youtube.com/embed/${trailers[0].key}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0`;
  } else {
    iframe.classList.add("d-none");
    movieNotFound.classList.remove("d-none");
  }
};

//on Close modal set src iframe to stop video playing
$("#trailerModal").on('hidden.bs.modal', function (e) {
  $("#trailerModal iframe").attr("src", $("#trailerModal iframe").attr("src"));
});

const setMovieInfo = (info) => {
  const modalTitle = document.getElementsByClassName("modal-title");
  const popularity = document.getElementById("popularity");
  const sipnosis = document.getElementById("sipnosis");
  const movieNotFound = document.querySelector(".movieNotFound");
  const genreE = document.getElementById("genre");

  if (info) {
    const {title, vote_average, overview, genres} = info;
    modalTitle[0].innerHTML = title;
    popularity.innerHTML = vote_average;
    sipnosis.innerHTML = overview;
    genreE.innerHTML = 'name';
    var genresText = ``;
    for(var genre of genres) {
      const { name } =  genre; 
      genresText = `${name } ${genresText}`;
    }
    genreE.innerHTML = genresText;
  }
};

const handleMovieSelection = (e) => {
  const id = e.target.getAttribute("data-id");
  const iframe = document.getElementById("movieTrailer");
  // here we need the id of the movie
  getMovieTrailer(id).then((data) => {
    const results = data.results;
    const youtubeTrailers = results.filter((result) => {
      if (result.site == "YouTube" && result.type == "Trailer") {
        return true;
      } else {
        return false;
      }
    });
    setTrailer(youtubeTrailers);
  });

  getMovieInfo(id).then((data) => {
    setMovieInfo(data);
  });

  // open modal
  $("#trailerModal").modal("show");
  // we need to call the api with the ID
};

const showMovies = (movies, element_selector, path_type) => {
  var moviesEl = document.querySelector(element_selector);
  for (var movie of movies.results) {
    const { id } = movie;
    var imageElement = document.createElement("img");
    imageElement.setAttribute("data-id", id);
    imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`;

    imageElement.addEventListener("click", (e) => {
      handleMovieSelection(e);
    });
    moviesEl.appendChild(imageElement);
  }
}
const showFeatureMovie = (movies) => {
  const { results } = movies;
  var featured = document.querySelector('.featured');
  var featureOverview = document.getElementById("featured__overview");
  var featureTitle = document.getElementById("featured__title");
  const featureMovie = Math.round(Math.random() * (movies.results.length-1))
  const movie = results[featureMovie];
  const { overview, backdrop_path, title} = movie;
  featureTitle.innerHTML = title;
  featureOverview.innerHTML = overview.slice(0, 140);;
  featured.style.backgroundImage = `url("https://image.tmdb.org/t/p/original//${backdrop_path}")`;
}

const fetchMoviesBasedOnGenre = (genreId) => {
  var url = "https://api.themoviedb.org/3/discover/movie?";
  url += `api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
  url += `&with_genres=${genreId}`;
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("something went wrong");
    }
  }); // returns a promise already
}

const fetchMovies = (url, element_selector, path_type) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("something went wrong");
      }
    })
    .then((data) => {
      showMovies(data, element_selector, path_type);
      if(element_selector === '#trending'){
        showFeatureMovie(data);
      }
    })
    .catch((error_data) => {
      console.log(error_data);
    });
}

const  showMoviesGenres = (genres) =>  {
  genres.genres.forEach(function (genre) {
    // get list of movies
    var movies = fetchMoviesBasedOnGenre(genre.id);
    movies
      .then(function (movies) {
        showMoviesBasedOnGenre(genre.name, movies);
      })
      .catch(function (error) {
        console.log("BAD BAD", error);
      });
    // show movies based on genre
  });
}

const  showMoviesBasedOnGenre = (genreName, movies) => {
  let allMovies = document.querySelector(".movies");
  let genreEl = document.createElement("div");
  genreEl.classList.add("movies__header");
  genreEl.innerHTML = `
      <h6>${genreName}</h6>
  `;
  let moviesEl = document.createElement("div");
  moviesEl.classList.add("movies__container");
  moviesEl.setAttribute("id", genreName);

  for (var movie of movies.results) {
    const { id, backdrop_path } = movie;
    var imageElement = document.createElement("img");
    imageElement.setAttribute("data-id", id);
    imageElement.src = `https://image.tmdb.org/t/p/original${backdrop_path}`;

    imageElement.addEventListener("click", (e) => {
      handleMovieSelection(e);
    });
    moviesEl.appendChild(imageElement);
  }

  allMovies.appendChild(genreEl);
  allMovies.appendChild(moviesEl);
}

const getGenres = () =>  {
  var url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("something went wrong");
      }
    })
    .then((data) => {
      showMoviesGenres(data);
    })
    .catch((error_data) => {
      console.log(error_data);
    });
}

const getOriginals = () => {
  var url = `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&with_networks=213`;
  fetchMovies(url, ".original__movies", "poster_path");
}

const getTrendingNow = () => {
  var url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`;
  fetchMovies(url, "#trending", "backdrop_path");

}

const  getTopRated = () => {
  var url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`;
  fetchMovies(url, "#top_rated", "backdrop_path");
}



