let apiKey = '1fcb095f3dea632c59c58e8920d44217';
let baseUrl = 'https://api.themoviedb.org/3/';
let genreSearch = 'genre/movie/list?api_key=';
let moviesByGenre = 'discover/movie?api_key=' + apiKey + '&with_genres=';
let langEn = '&language=en-US';

let genreListEl = document.querySelector('#genres');
let movieListEl = document.querySelector('#movies');
let movieInfoEl = document.querySelector('#movieInfo');

let movieGenreNums = [
  28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770,
  53, 10752, 37,
];

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

// This will append the genres to buttons and link to a movie drop down list
let getMovieGenre = (data) => {
  for (let i = 0; i < data.genres.length; i++) {
    let movieGenre = document.createElement('button');
    movieGenre.setAttribute('id', data.genres[i].id);
    movieGenre.setAttribute('class', 'btn-secondary');
    movieGenre.setAttribute('style', 'margin: 1rem .5rem');
    movieGenre.dataset.name = `${data.genres[i].name}`;
    movieGenre.addEventListener('click', (event) => {
      movieListEl.textContent = '';
      let apiUrl = ''.concat(
        baseUrl + moviesByGenre + movieGenreNums[i] + langEn
      );

      fetch(apiUrl).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            for (let i = 0; i < data.results.length; i++) {
              let movieList = document.createElement('option');
              movieList.setAttribute('id', data.results[i].title);

              movieList.textContent = data.results[i].title;

              movieListEl.appendChild(movieList);
            }
          });
        }
      });
    });
    movieGenre.textContent = data.genres[i].name;

    genreListEl.appendChild(movieGenre);
  }
};

var displayMovieInfo = () => {
  console.log();
};

searchMoviesGenre();
document.querySelector('select').addEventListener('change', () => {
  displayMovieInfo();
});
