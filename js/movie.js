// Fetch API for movie database

// Post movie genre list to HTML dropdown

// Post movie list to HTML dropdown
let apiKey = '1fcb095f3dea632c59c58e8920d44217';
let baseUrl = 'https://api.themoviedb.org/3/';
let genreSearch = 'genre/movie/list?api_key=';
let moviesNowPlaying = 'movie/now_playing?api_key=';
let langEn = '&language=en-US';

let movieGenreSelect = document.querySelector('#moviegenre-select');
let movieGenre = document.querySelector('#genre-option');

var searchMoviesGenre = () => {
  let apiUrl = ''.concat(baseUrl + genreSearch + apiKey + langEn);

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        getMovieGenre(data);
      });
    }
  });
};

let getMovieGenre = (data) => {
  for (let i = 0; i < data.genres.length; i++) {
    let movieGenre = document.createElement('option');
    movieGenre.textContent = data.genres[i].name;

    movieGenreSelect.appendChild(movieGenre);
  }
  searchNowPlaying(data);
};

let searchNowPlaying = () => {
  let apiUrl = ''.concat(baseUrl + moviesNowPlaying + apiKey + langEn);

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.results[0].title);
      });
    }
  });
};

searchMoviesGenre();
