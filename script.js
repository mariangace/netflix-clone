window.onload = () => {
  fetchMovies();
};

function fetchMovies() {
  fetch(
    "https://api.themoviedb.org/3/discover/tv?api_key=bb3371dce253d99f5d38531c44cefec8"
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      console.log(data);
      addMovies(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Add movies t o the front end
function addMovies(movies) {
  //Add img element to the original__movies element
  var moviesEl = document.querySelector(".original__movies");

  for (var movie of movies.results) {
    var image = `<img src='https://image.tmdb.org/t/p/original/${movie.poster_path}'>`;
    moviesEl.innerHTML += image;
  }

  // var moviesContainer = document.querySelector(".movies__container");
  // console.log(moviesContainer);
  // for (var i = 0; i < 8; i++) {
  //   moviesContainer.innerHTML +=
  //     "<img src='https://image.tmdb.org/t/p/original//wzJRB4MKi3yK138bJyuL9nx47y6.jpg'/>";
  // }
  // var moviesContainer1 = document.querySelector(".movies__container");
  // for (var i = 0; i < 10; i++) {
  //   moviesContainer1.innerHTML +=
  //     "<img src='https://image.tmdb.org/t/p/original//wzJRB4MKi3yK138bJyuL9nx47y6.jpg'/>";
  // }
}
