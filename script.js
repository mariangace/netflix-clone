window.onload = () => {
  addMovies();
};
// Add movies t o the front end
function addMovies() {
  //Add img element to the original__movies element
  var moviesEl = document.querySelector(".original__movies");

  for (var i = 0; i < 5; i++) {
    moviesEl.innerHTML +=
      "<img src='https://image.tmdb.org/t/p/original//scZlQQYnDVlnpxFTxaIv2g0BWnL.jpg'/>";
  }

  var moviesContainer = document.querySelector(".movies__container");
  console.log(moviesContainer);
  for (var i = 0; i < 8; i++) {
    moviesContainer.innerHTML +=
      "<img src='https://image.tmdb.org/t/p/original//wzJRB4MKi3yK138bJyuL9nx47y6.jpg'/>";
  }
  var moviesContainer1 = document.querySelector(".movies__container");
  for (var i = 0; i < 10; i++) {
    moviesContainer1.innerHTML +=
      "<img src='https://image.tmdb.org/t/p/original//wzJRB4MKi3yK138bJyuL9nx47y6.jpg'/>";
  }
}
