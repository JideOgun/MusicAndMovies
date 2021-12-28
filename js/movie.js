// Global variables
let apiKey = '1fcb095f3dea632c59c58e8920d44217';

// Page variables
let genreListEl = document.querySelector('#genres').children;
let movieListEl = document.querySelector('#movies');
let nextPageBtn = document.querySelector('#next');
let previousPageBtn = document.querySelector('#previous');
let pageNumber = document.querySelector('.pageNumber');
let pageName = document.querySelector('.pageName');
let homeBtn = document.querySelector('.home');
let searchBtn = document.querySelector('#searchBtn');
let searchText = document.querySelector('#input');

// Modal variables
let modalEl = document.querySelector('.modal');
let modalBg = document.querySelector('.modal-background');
let modalContent = document.querySelector('.content');
let modalImg = document.querySelector('.image');
let modalBtn = document.querySelector('.modal-close');
let modalLink = document.querySelector('.link');
let modalAlert = document.querySelector('.alert');
let modalTrailer = document.querySelector('.trailers');
let modalVideoList = document.querySelector('.videos');

// Counter variables
let pageNum = 1;
let removePrevious = 2;
let moviePosters = 20;

let movieGenreNums = [
  28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770,
  53, 10752, 37,
];

// Api call for genre
let getMovieGenre = () => {
  movieListEl.innerHTML = '';

  let apiUrl = ''.concat(
    'https://api.themoviedb.org/3/discover/movie?api_key=' +
      apiKey +
      '&with_genres=' +
      localStorage.getItem('genre') +
      '&language=en-US&adult=false&page=' +
      pageNum
  );

  fetch(apiUrl).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        displayMovieData(data);
      });
    }
  });
};

// Search bar handler
var searchHandler = () => {
  movieListEl.innerHTML = '';
  var searchUrl =
    'https://api.themoviedb.org/3/search/movie?api_key=' +
    apiKey +
    '&language=en-US&query=' +
    localStorage.getItem('searchField') +
    '&page=' +
    pageNum +
    '&include_adult=false';

  fetch(searchUrl).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        displayMovieData(data);
      });
    }
  });
};

// Displays movie data
var displayMovieData = (data) => {
  for (let i = 0; i < moviePosters; i++) {
    let movieInfoDiv = document.createElement('div');
    movieInfoDiv.setAttribute('id', 'movieDiv');
    movieInfoDiv.setAttribute(
      'style',
      'width: 342px; color: white; text-align: center'
    );
    movieInfoDiv.setAttribute('class', 'column is-one-fifth is-full-mobile');
    // This generates the posters and titles
    let displayMovies = document.createElement('img');
    displayMovies.setAttribute('id', data.results[i].title);

    displayMovies.setAttribute('alt', data.results[i].title);
    displayMovies.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w342' + data.results[i].poster_path
    );
    displayMovies.setAttribute(
      'style',
      'width: 100%; height: 100%; color: red; font-size: 1.25em; cursor: pointer;'
    );

    // Displays alt message if no poster available
    if (displayMovies.src == 'https://image.tmdb.org/t/p/w342null') {
      displayMovies.removeAttribute(
        'src',
        'https://image.tmdb.org/t/p/w342null'
      );

      displayMovies.setAttribute('src', './assets/images/MM.png');
    }
    // Modal component
    displayMovies.addEventListener('click', () => {
      modalEl.classList.add('is-active');

      localStorage.setItem('movieTitle', data.results[i].title);
      localStorage.setItem('movieInfo', data.results[i].overview);
      localStorage.setItem('movieId', data.results[i].id);

      let movieTitle = document.querySelector('.title');
      movieTitle.textContent = data.results[i].title;
      let displayMovieOverview = document.querySelector('.content');
      displayMovieOverview.textContent = data.results[i].overview;
      $('html').css('overflow', 'hidden');
      getMovieSite();
      getVideoData();
    });

    // Adds posters to page
    localStorage.setItem('pageNumber', data.page);

    pageNumber.innerHTML = 'Page ' + pageNum;

    movieInfoDiv.append(displayMovies);
    movieListEl.append(movieInfoDiv);
  }
};

// Adds second image to modal and activates link to movie website if available
var getMovieSite = () => {
  let apiUrl = ''.concat(
    'https://api.themoviedb.org/3/movie/' +
      localStorage.getItem('movieId') +
      '?api_key=' +
      apiKey +
      '&language=en-US'
  );
  fetch(apiUrl).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        localStorage.setItem('backdrop', data.backdrop_path);
        localStorage.setItem('website', data.homepage);
        console.log(data.title);
        siteLinkHandler();
      });
    }
  });
};

// Links to movies available webpage
var siteLinkHandler = () => {
  if (
    localStorage.getItem('website') !== '' &&
    localStorage.getItem('backdrop') !== 'null'
  ) {
    modalLink.setAttribute('href', localStorage.getItem('website'));
    modalImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w342' + localStorage.getItem('backdrop')
    );
    modalLink.setAttribute('target', '_blank');
    modalImg.setAttribute('alt', localStorage.getItem('movieTitle'));
    modalImg.setAttribute('style', 'cursor: pointer');
  } else if (localStorage.getItem('website') === '') {
    modalAlert.textContent = 'Website Not Available';
    modalImg.removeAttribute('src', 'https://image.tmdb.org/t/p/w342null');
    modalImg.setAttribute('src', './assets/images/MM.png');
    modalImg.setAttribute('style', 'padding: 0; cursor: not-allowed');
  } else if (localStorage.getItem('backdrop') === 'null') {
    modalImg.removeAttribute('src', 'https://image.tmdb.org/t/p/w342null');

    modalImg.setAttribute('src', './assets/images/MM.png');
    modalImg.setAttribute('style', 'cursor: pointer');
    modalLink.setAttribute('href', localStorage.getItem('website'));
    modalLink.setAttribute('target', '_blank');
  }
};

// links trailers on modal.  Still working on this
var getVideoData = () => {
  let apiUrl =
    'https://api.themoviedb.org/3/movie/' +
    localStorage.getItem('movieId') +
    '/videos?api_key=1fcb095f3dea632c59c58e8920d44217&language=en-US';
  fetch(apiUrl).then((response) => {
    if (response.ok) {
      response.json().then((video) => {
        for (var i = 0; i < video.results.length; i++) {
          if (video.results[i].type === 'Trailer') {
            console.log(video.results[i]);
            let videoKey = video.results[i].key;

            modalVideoList.setAttribute('href', 'https://youtu.be/' + videoKey);
            modalVideoList.setAttribute('target', '_blank');
            modalVideoList.textContent = video.results[i].name;
            console.log(modalVideoList);
          }
        }
      });
    }
  });
};

// Genre click event starts the api call to list movie posters
for (let i = 0; i < movieGenreNums[i]; i++) {
  genreListEl[i].addEventListener('click', (event) => {
    localStorage.setItem('movieGenre', genreListEl[i].textContent);
    localStorage.setItem('genre', movieGenreNums[i]);
    if (localStorage.getItem('genre') == movieGenreNums[i]) {
      pageNum = 1;
      $('.genrePageNum').show();
      $('.searchPageNum').hide();
      $('#previous').hide();
      $('#next').show();
      $('#previousSearch').hide();
      $('#nextSearch').hide();
      localStorage.removeItem('searchField');
      $('.pageNumberInput').val('');
      pageName.textContent =
        'Searching by Genre: ' +
        localStorage.getItem('movieGenre').charAt(0).toUpperCase() +
        localStorage.getItem('movieGenre').slice(1);
      getMovieGenre();
    }
  });
}

// Event Handlers

// Buttons for next page
$('#next').click(() => {
  pageNum++;
  $('#previous').show();
  getMovieGenre();
});

// Button for previous page
$('#previous').click(() => {
  if (localStorage.getItem('pageNumber') == removePrevious) {
    $('#previous').hide();
  }
  pageNum--;
  getMovieGenre();
});

// Buttons for next page with search
$('#nextSearch').click(() => {
  pageNum++;
  $('#previousSearch').show();
  searchHandler();
});

// Button for previous page with search
$('#previousSearch').click(() => {
  if (localStorage.getItem('pageNumber') == removePrevious) {
    $('#previousSearch').hide();
  }
  pageNum--;
  searchHandler();
});

// Search  button click handler
$('#searchBtn').click((e) => {
  if ($('#input').val() !== '') {
    e.preventDefault();
    pageNum = 1;
    $('.genrePageNum').hide();
    $('.searchPageNum').show();
    $('#nextSearch').show();
    $('#previous').hide();
    $('#next').hide();
    $('#previousSearch').hide();
    localStorage.removeItem('movieGenre');
    localStorage.setItem('searchField', searchText.value);
    pageName.textContent =
      'Searching for Keyword: ' +
      localStorage.getItem('searchField').charAt(0).toUpperCase() +
      localStorage.getItem('searchField').slice(1);
    $('input').val('');
    $('.searchPageNum').val('');
    searchHandler();
  }
});

// Choose page handlers
var searchPage = () => {
  pageNum = localStorage.getItem('pageNumber');
  searchHandler();
};

var genrePage = () => {
  pageNum = localStorage.getItem('pageNumber');
  getMovieGenre();
};

// Enables keypress enter for searchbars
$('#input').keypress(function (e) {
  if (e.which == 13 && $('#input').val() !== '') {
    $('#searchBtn').click();
    $('.searchPageNum').show();
  }
});

$('.pageNumberInput').keypress(function (e) {
  if (e.which == 13 && $('.pageNumberInput').val() !== '') {
    $('#searchPageNumId').click();
  }
});

$('.genreNumberInput').keypress(function (e) {
  if (e.which == 13 && $('.genreNumberInput').val() !== '') {
    $('#genrePageNumId').click();
  }
});

// Search page number click event handler
$('#searchPageNumId').click(() => {
  if ($('.pageNumberInput').val() == '') {
    console.log();
  } else {
    localStorage.setItem('pageNumber', $('.pageNumberInput').val());
    $('.pageNumberInput').val('');
    $('#previousSearch').show();
    searchPage();
  }
});

// Genre page number click event handler
$('#genrePageNumId').click(() => {
  if ($('.genreNumberInput').val() == '') {
    console.log();
  } else {
    localStorage.setItem('pageNumber', $('.genreNumberInput').val());
    $('.genreNumberInput').val('');
    $('#previous').show();
    genrePage();
  }
});

// Gets rid of all buttons and clears storage on load
$(document).ready(() => {
  $('#previous').hide();
  $('#next').hide();
  $('#previousSearch').hide();
  $('#nextSearch').hide();
  $('.searchPageNum').hide();
  $('.genrePageNum').hide();
  localStorage.clear();
});

// Modal event listeners
$('.modal-background').click(() => {
  modalLink.removeAttribute('target');
  modalImg.removeAttribute('alt');
  modalAlert.textContent = '';
  modalLink.removeAttribute('href');
  modalEl.classList.remove('is-active');
  $('html').removeAttr('style');
});

$('.modal-close').click(() => {
  modalLink.removeAttribute('target');
  modalImg.removeAttribute('alt');
  modalAlert.textContent = '';
  modalLink.removeAttribute('href');
  modalEl.classList.remove('is-active');
  $('html').removeAttr('style');
});
