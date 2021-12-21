let apiKey = '1fcb095f3dea632c59c58e8920d44217';

let genreListEl = document.querySelector('#genres');
let movieListEl = document.querySelector('#movies');
let movieInfoEl = document.querySelector('#movieInfo');
let moviePage = document.querySelector('display');
let movieList = document.querySelector('#option');
let nextPageBtn = document.querySelector('#next');
let previousPageBtn = document.querySelector('#previous');

let genreData, movieData;
let pageNum = 1;

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
      response
        .json()
        .then(function (data) {
          getMovieGenre(data);
          genreData = data;
        })
        .catch(function (error) {
          alert('There was a problem, try again later');
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
    movieGenre.setAttribute('style', 'margin: 1rem .5rem; color: goldenrod');
    movieGenre.dataset.name = `${data.genres[i].name}`;
    movieGenre.addEventListener('click', (event) => {
      resetBtns();
      pageNum = 1;
      movieListEl.textContent = '';

      localStorage.setItem('movieId', movieGenre.id);

      let apiUrl = ''.concat(
        'https://api.themoviedb.org/3/discover/movie?api_key=' +
          apiKey +
          '&with_genres=' +
          movieGenreNums[i] +
          '&language=en-US&adult=false&page=' +
          pageNum
      );

      fetch(apiUrl).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            // movieData = data;
            // console.log(movieData);
            for (let i = 0; i < data.results.length; i++) {
              let movieInfoDiv = document.createElement('div');
              movieInfoDiv.setAttribute('id', 'movieDiv');
              movieInfoDiv.setAttribute('style', 'width: 342px; color: white');

              // This generates the posters and titles
              let displayMovies = document.createElement('img');
              displayMovies.setAttribute('id', data.results[i].title);
              displayMovies.setAttribute(
                'src',
                'https://image.tmdb.org/t/p/w342' + data.results[i].poster_path
              );

              // This adds an overview of the movie above the poster

              let displayMovieOverview = document.createElement('p');

              displayMovieOverview.textContent = data.results[i].overview;
              displayMovieOverview.setAttribute(
                'style',
                'padding: 1rem; color: goldenrod; '
              );

              let movieTitle = document.createElement('div');
              movieTitle.setAttribute('id', 'info');
              movieTitle.setAttribute(
                'style',
                'font-weight: bolder; text-decoration: underline'
              );
              movieTitle.textContent = data.results[i].title;

              // Adds posters, titles, and overview to page

              movieInfoDiv.append(
                displayMovies,
                movieTitle,
                displayMovieOverview
              );
              movieListEl.append(movieInfoDiv);
            }
          });
        }
      });
    });

    movieGenre.textContent = data.genres[i].name;

    genreListEl.appendChild(movieGenre);
  }
};

var resetBtns = () => {
  nextPageBtn.textContent = 'Next';
  previousPageBtn.textContent = 'Previous';
};

nextPageBtn.addEventListener('click', () => {
  window.scrollTo(0, 0);
  pageNum++;
  genreListEl.innerHTML = '';
  movieListEl.innerHTML = '';

  for (let i = 0; i < 1; i++) {
    let apiUrl = ''.concat(
      'https://api.themoviedb.org/3/discover/movie?api_key=' +
        apiKey +
        '&with_genres=' +
        localStorage.getItem('movieId') +
        '&language=en-US&adult=false&page=' +
        pageNum
    );

    fetch(apiUrl).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          movieData = data;
          console.log(movieData);
          for (let i = 0; i < data.results.length; i++) {
            let movieInfoDiv = document.createElement('div');
            movieInfoDiv.setAttribute('id', 'movieDiv');
            movieInfoDiv.setAttribute('style', 'width: 342px; color: white');

            // This generates the posters and titles
            let displayMovies = document.createElement('img');
            displayMovies.setAttribute('id', data.results[i].title);
            displayMovies.setAttribute(
              'src',
              'https://image.tmdb.org/t/p/w342' + data.results[i].poster_path
            );

            // This adds an overview of the movie above the poster

            let displayMovieOverview = document.createElement('p');

            displayMovieOverview.textContent = data.results[i].overview;
            displayMovieOverview.setAttribute(
              'style',
              'padding: 1rem; color: goldenrod; '
            );

            let movieTitle = document.createElement('div');
            movieTitle.setAttribute('id', 'info');
            movieTitle.setAttribute(
              'style',
              'font-weight: bolder; text-decoration: underline'
            );
            movieTitle.textContent = data.results[i].title;

            // Adds posters, titles, and overview to page

            movieInfoDiv.append(
              displayMovies,
              movieTitle,
              displayMovieOverview
            );
            movieListEl.append(movieInfoDiv);
          }
        });
      }
    });
  }
  searchMoviesGenre();
});

previousPageBtn.addEventListener('click', () => {
  window.scrollTo(0, 0);
  pageNum--;
  genreListEl.innerHTML = '';
  movieListEl.innerHTML = '';

  for (let i = 0; i < 1; i++) {
    let apiUrl = ''.concat(
      'https://api.themoviedb.org/3/discover/movie?api_key=' +
        apiKey +
        '&with_genres=' +
        localStorage.getItem('movieId') +
        '&language=en-US&adult=false&page=' +
        pageNum
    );

    fetch(apiUrl).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          movieData = data;
          console.log(movieData);
          for (let i = 0; i < data.results.length; i++) {
            let movieInfoDiv = document.createElement('div');
            movieInfoDiv.setAttribute('id', 'movieDiv');
            movieInfoDiv.setAttribute('style', 'width: 342px; color: white');

            // This generates the posters and titles
            let displayMovies = document.createElement('img');
            displayMovies.setAttribute('id', data.results[i].title);
            displayMovies.setAttribute(
              'src',
              'https://image.tmdb.org/t/p/w342' + data.results[i].poster_path
            );

            // This adds an overview of the movie above the poster

            let displayMovieOverview = document.createElement('p');

            displayMovieOverview.textContent = data.results[i].overview;
            displayMovieOverview.setAttribute(
              'style',
              'padding: 1rem; color: goldenrod; '
            );

            let movieTitle = document.createElement('div');
            movieTitle.setAttribute('id', 'info');
            movieTitle.setAttribute(
              'style',
              'font-weight: bolder; text-decoration: underline'
            );
            movieTitle.textContent = data.results[i].title;

            // Adds posters, titles, and overview to page

            movieInfoDiv.append(
              displayMovies,
              movieTitle,
              displayMovieOverview
            );
            movieListEl.append(movieInfoDiv);
          }
        });
      }
    });
  }

  searchMoviesGenre();
});

searchMoviesGenre();
