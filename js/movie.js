let apiKey = '1fcb095f3dea632c59c58e8920d44217';

let genreListEl = document.querySelector('#genres');
let movieListEl = document.querySelector('#movies');
let movieInfoEl = document.querySelector('#movieInfo');
let moviePage = document.querySelector('display');
let movieList = document.querySelector('#option');
let nextPageBtns = document.querySelector('.more-btn');

let movieGenreNums = [
  28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770,
  53, 10752, 37,
];

// This will call TMDB api to generate genres
var searchMoviesGenre = () => {
  let apiUrl = ''.concat(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=' +
      apiKey +
      '&language=en-US'
  );

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        getMovieGenre(data);
      });
    }
  });
};

// This will append the genres to buttons and link to a movie display page
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
        'https://api.themoviedb.org/3/discover/movie?api_key=' +
          apiKey +
          '&with_genres=' +
          movieGenreNums[i] +
          '&language=en-US&adult=false&page=11'
      );

      fetch(apiUrl).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            for (let i = 0; i < data.results.length; i++) {
              let movieInfoDiv = document.createElement('div');
              movieInfoDiv.setAttribute('id', 'movieDiv');
              movieInfoDiv.setAttribute('style', 'width: 342px; color: white');

              // This generates the posters and titles
              let displayMovies = document.createElement('img');
              displayMovies.setAttribute('id', data.results[i].title);
              displayMovies.setAttribute(
                'src',
                'https://image.tmdb.org/t/p/w185' + data.results[i].poster_path
              );

              // This adds an overview of the movie above the poster
              displayMovies.addEventListener('click', (event) => {
                let displayMovieOverview = document.createElement('div');

                movieInfoDiv.prepend(displayMovieOverview);
                displayMovieOverview.textContent = data.results[i].overview;
              });

              let movieInfo = document.createElement('div');
              movieInfo.setAttribute('id', 'info');
              movieInfo.textContent = data.results[i].title;

              // Adds posters and title to page
              movieListEl.append(movieInfoDiv);
              movieInfoDiv.append(movieInfo, displayMovies);
            }
          });
        }
      });
    });

    movieGenre.textContent = data.genres[i].name;

    genreListEl.appendChild(movieGenre);
  }
};

searchMoviesGenre();

// nextPageBtns.addEventListener('click', () => {});
