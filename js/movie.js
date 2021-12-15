// Fetch API for movie database

// Post movie genre list to HTML dropdown

// Post movie list to HTML dropdown
var apiKey = '1fcb095f3dea632c59c58e8920d44217';

// function successCB(data) {
//   console.log('Success callback: ' + data);
// }

// function errorCB(data) {
//   console.log('Error callback: ' + data);
// }

var searchMovies = function () {
  var apiUrl =
    'https://api.themoviedb.org/3/movie/now_playing?api_key=' +
    apiKey +
    '&language=en-US&page=1';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      });
    }
  });
};
searchMovies();
