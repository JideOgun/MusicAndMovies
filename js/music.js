

var apiController = function () {
    const cliend_Id = `75195b645b894213b9018c1562267908`;
    const client_Secret = `93152cc4c4c84ea7b2ba88d3b693ae4f`;

const getSpotifyToken = async() => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + (btoa('75195b645b894213b9018c1562267908' + ':' + '93152cc4c4c84ea7b2ba88d3b693ae4f'))
        },
        body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    console.log(data);
    // console.log(data.access_token);
    localStorage.setItem('token', data.access_token);
    return data.access_token;
}
return getSpotifyToken();
}


// retrieve Genres from data base and append into genre dropdown list
async function spotifyGenres () {

    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    console.log(data)

    // function to display genres inside genre droplist
    var genreDroplist = document.getElementById('genre-select');
    // console.log(data.categories.items.length)
    for (var i = 0; i < data.categories.items.length; i++) {
        gDroplist = document.createElement('option');
        gDroplist.textContent = data.categories.items[i].name; 
       genreDroplist.append(gDroplist);
    }
    

    var logGenreId = function(){
        console.log(genreDroplist.value)  
        genreId = data.categories.items[genreDroplist.selectedIndex - 1].id;
        console.log(genreId) ;
        localStorage.setItem('genreId', genreId)
        spotifyGenrePlaylist (token, genreId)
    }
    
    genreDroplist.addEventListener('change',logGenreId);
    return data.categories.items;
}

async function spotifyGenrePlaylist (token, genreId) {
    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
    const data = await result.json();
    
    // adding playlist to drop down menu
    var playlistDroplist = document.getElementById('playlist-select');
    for (var i = 0; i < data.playlists.items.length; i++) {
        pDroplist = document.createElement('option');
        pDroplist.textContent = data.playlists.items[i].name; 
       playlistDroplist.append(pDroplist);
    }
    console.log(data);

    function logTracksEndPoint () {
        tracksEndPoint = data.playlists.items[playlistDroplist.selectedIndex].tracks.href;
        console.log(tracksEndPoint);
        localStorage.setItem('tracksEndPoint', tracksEndPoint)
    }
    playlistDroplist.addEventListener('change',logTracksEndPoint);
    return data 
}



// retrieving track information from api
async function spotifyTracks () {
    
    var limit = 10;
    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
    const data = await result.json();
    console.log(data);
    console.log(data.items.length)
    // function to display tracks to dom
    function displayTracks() {
        for (var i = 0; i < data.items.length; i++) {
            var containerEl = document.getElementById('track-list');
            newdiv = document.createElement('li');
            newdiv.textContent = data.items[0].name;
            console.log(data.items[i].name);
            // img = document.createElement('img');
            // img.src = 'https://i.scdn.co/image/ab67616d0000b2739c685a39f67e019486f2a03b'
            containerEl.append(newdiv);
            // newdiv.append(img); 
        }

    }
    displayTracks();
    return data;
}



// async function spotifyNewRelease (token) {
//     const result = await fetch(`https://api.spotify.com/v1/browse/new-releases`, {
//         method: 'GET',
//         headers: { 'Authorization' : 'Bearer ' + token}
//     });
//     const data = await result.json();
//     console.log(data);
//     return data
// }

var btnEl = document.getElementById('btn-id')
var token = localStorage.getItem('token')
var tracksEndPoint = localStorage.getItem('tracksEndPoint')
// console.log(token);
spotifyGenres(token);
// btnEl.addEventListener('click', spotifyTracks(token, tracksEndPoint));
// spotifyNewRelease (token);

apiController();

