let apiKey = '1fcb095f3dea632c59c58e8920d44217';

let genreListEl = document.querySelector('#genres');
let movieListEl = document.querySelector('#movies');
let nextPageBtn = document.querySelector('#next');
let previousPageBtn = document.querySelector('#previous');

let modalEl = document.querySelector('.modal');
let modalBg = document.querySelector('.modal-background');
let modalContent = document.querySelector('.content');
let modalBtn = document.querySelector('.modal-close');

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
    movieGenre.setAttribute(
      'class',
      'button is-dark is-small is-rounded is-clickable'
    );
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
            movieData = data;

            for (let i = 0; i < data.results.length; i++) {
              let movieInfoDiv = document.createElement('div');
              movieInfoDiv.setAttribute('id', 'movieDiv');
              movieInfoDiv.setAttribute(
                'style',
                'width: 342px; color: white; text-align: center'
              );
              movieInfoDiv.setAttribute(
                'class',
                'column is-one-fifth is-full-mobile'
              );

              // This generates the posters and titles
              let displayMovies = document.createElement('img');
              displayMovies.setAttribute('id', data.results[i].title);
              displayMovies.setAttribute('class', 'is-clickable is-clipped');
              displayMovies.setAttribute(
                'src',
                'https://image.tmdb.org/t/p/w342' + data.results[i].poster_path
              );

              displayMovies.addEventListener('click', () => {
                modalEl.classList.add('is-active');

                localStorage.setItem('movieTitle', data.results[i].title);
                localStorage.setItem('movieInfo', data.results[i].overview);
                let movieTitle = document.querySelector('.title');
                movieTitle.textContent = data.results[i].title;
                let displayMovieOverview = document.querySelector('.content');
                displayMovieOverview.textContent = data.results[i].overview;
              });

              // Adds posters, titles, and overview to page

              movieInfoDiv.append(displayMovies);
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

          for (let i = 0; i < data.results.length; i++) {
            let movieInfoDiv = document.createElement('div');
            movieInfoDiv.setAttribute('id', 'movieDiv');
            movieInfoDiv.setAttribute(
              'style',
              'width: 342px; color: white; text-align: center'
            );
            movieInfoDiv.setAttribute('class', 'column is-one-fifth');

            // This generates the posters and titles
            let displayMovies = document.createElement('img');
            displayMovies.setAttribute('id', data.results[i].title);
            displayMovies.setAttribute('class', 'is-clickable');
            displayMovies.setAttribute(
              'src',
              'https://image.tmdb.org/t/p/w342' + data.results[i].poster_path
            );

            // This adds an overview of the movie

            displayMovies.addEventListener('click', () => {
              modalEl.classList.add('is-active');

              localStorage.setItem('movieTitle', data.results[i].title);
              localStorage.setItem('movieInfo', data.results[i].overview);
              let movieTitle = document.querySelector('.title');
              movieTitle.textContent = data.results[i].title;
              let displayMovieOverview = document.querySelector('.content');
              displayMovieOverview.textContent = data.results[i].overview;
            });

            // Adds posters, titles, and overview to page

            movieInfoDiv.append(
              displayMovies
              // movieTitle,
              // displayMovieOverview
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

          for (let i = 0; i < data.results.length; i++) {
            let movieInfoDiv = document.createElement('div');
            movieInfoDiv.setAttribute('id', 'movieDiv');
            movieInfoDiv.setAttribute(
              'style',
              'width: 342px; color: white; text-align: center'
            );
            movieInfoDiv.setAttribute('class', 'column is-one-fifth');

            // This generates the posters and titles
            let displayMovies = document.createElement('img');
            displayMovies.setAttribute('id', data.results[i].title);
            displayMovies.setAttribute('class', 'is-clickable');
            displayMovies.setAttribute(
              'src',
              'https://image.tmdb.org/t/p/w342' + data.results[i].poster_path
            );

            // This adds an overview of the movie

            displayMovies.addEventListener('click', () => {
              modalEl.classList.add('is-active');

              localStorage.setItem('movieTitle', data.results[i].title);
              localStorage.setItem('movieInfo', data.results[i].overview);
              let movieTitle = document.querySelector('.title');
              movieTitle.textContent = data.results[i].title;
              let displayMovieOverview = document.querySelector('.content');
              displayMovieOverview.textContent = data.results[i].overview;
            });

            // Adds posters, titles, and overview to page

            movieInfoDiv.append(
              displayMovies
              // movieTitle,
              // displayMovieOverview
            );
            movieListEl.append(movieInfoDiv);
          }
        });
      }
    });
  }

  searchMoviesGenre();
});

modalBg.addEventListener('click', () => {
  modalEl.classList.remove('is-active');
});

modalBtn.addEventListener('click', () => {
  modalEl.classList.remove('is-active');
});

searchMoviesGenre();
