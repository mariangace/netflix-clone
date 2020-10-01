window.onload = () => {
  fetchMovies(
    "https://api.themoviedb.org/3/discover/tv?api_key=bb3371dce253d99f5d38531c44cefec8",
    ".original__movies",
    "poster_path"
  );
  fetchMovies(
    "https://api.themoviedb.org/3/discover/movie?api_key=bb3371dce253d99f5d38531c44cefec8",
    "#trending__now",
    "backdrop_path"
  );
  fetchMovies(
    "https://api.themoviedb.org/3/discover/tv?api_key=bb3371dce253d99f5d38531c44cefec8",
    "#top__rated",
    "backdrop_path"
  );
};

function fetchMovies(url, selector, img) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      console.log(data);
      addMovies(data, selector, img);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Add movies t o the front end
function addMovies(movies, selector, img) {
  //Add img element to the original__movies element
  var moviesEl = document.querySelector(selector);

  for (var movie of movies.results) {
    var image = `<img src='https://image.tmdb.org/t/p/original/${movie[img]}'>`;
    moviesEl.innerHTML += image;
  }
}
