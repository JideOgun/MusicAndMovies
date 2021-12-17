// Fetch API for movie database

// Post movie genre list to HTML dropdown

// Post movie list to HTML dropdown
let apiKey = '1fcb095f3dea632c59c58e8920d44217';
let baseUrl = 'https://api.themoviedb.org/3/';
let genreSearch = 'genre/movie/list?api_key=';
let moviesByGenre = 'discover/movie?api_key=' + apiKey + '&with_genres=';
let langEn = '&language=en-US';

let movieGenreNums = [
  28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770,
  53, 10752, 37,
];

console.log(moviesByGenre);
// let movieGenreSelect = document.querySelector('#moviegenre-select');
// let movieGenre = document.querySelector('#genre-option');

// This will call TMDB api to generate genres
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

// This will append the genres to a drop down list
let getMovieGenre = (data) => {
  for (let i = 0; i < data.genres.length; i++) {
    let movieGenre = document.createElement('option');
    movieGenre.textContent = data.genres[i].name;

    // movieGenreSelect.appendChild(movieGenre);
  }
  searchNowPlaying(data);
};

let searchNowPlaying = () => {
  for (let i = 0; i < movieGenreNums.length; i++) {
    let apiUrl = ''.concat(
      baseUrl + moviesByGenre + movieGenreNums[i] + langEn
    );

    fetch(apiUrl).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
        });
      }
    });
  }
};

searchMoviesGenre();
