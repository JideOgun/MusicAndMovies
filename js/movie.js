// Fetch API for movie database

// Post movie genre list to HTML dropdown

// Post movie list to HTML dropdown
let apiKey = '1fcb095f3dea632c59c58e8920d44217';
let baseUrl = 'https://api.themoviedb.org/3/';
let genreSearch = 'genre/movie/list?api_key=';

let movieGenreSelect = document.querySelector('#moviegenre-select');
let movieGenre = document.querySelector('#genre-option');

var searchMoviesGenre = () => {
  var apiUrl = ''.concat(baseUrl + genreSearch + apiKey + '&language=en-US');

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        getMovie(data);
      });
    }
  });
};

let getMovie = (data) => {
  for (let i = 0; i < data.genres.length; i++) {
    let movieGenre = document.createElement('option');
    movieGenre.textContent = data.genres[i].name;

    movieGenreSelect.appendChild(movieGenre);
  }
};

searchMoviesGenre();
