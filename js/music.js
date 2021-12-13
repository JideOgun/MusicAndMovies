

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
    // console.log(data);
    console.log(data.access_token);
    localStorage.setItem('token', data.access_token);
    return data.access_token;
}


return getSpotifyToken();
}



async function spotifyGenres () {

    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    console.log(data)

    // function to display genres inside genre droplist
    var genreDroplist = document.getElementById('genre-select');
    console.log(data.categories.items.length)
    for (var i = 0; i < data.categories.items.length; i++) {
        html = document.createElement('option');
       html.textContent = data.categories.items[i].name; 
       genreDroplist.append(html);
    }
    
    

    
    return data.categories.items;
    
}

async function spotifyTracks () {
    const result = await fetch(`https://api.spotify.com/v1/tracks/${spotifyId}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
    const data = await result.json();
    console.log(data);
    console.log(data.album.name);

    // function to display tracks to dom
    var displayTracks = function() {
           var containerEl = document.getElementById('x');
    newdiv = document.createElement('div');
    newdiv.textContent = data.album.name;
    img = document.createElement('img');
    img.src = 'https://i.scdn.co/image/ab67616d0000b2739c685a39f67e019486f2a03b'
    containerEl.append(newdiv);
    newdiv.append(img); 
    }
    // displayTracks();
    return data
}

// async function spotifyGenrePlaylist (token, genreId) {
//     const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists`, {
//         method: 'GET',
//         headers: { 'Authorization' : 'Bearer ' + token}
//     });
//     const data = await result.json();
//     var genreId = data.categories.items[0].id;
//     console.log(genreId)
//     console.log(data);
//     return data 
// }

async function spotifyNewRelease (token) {
    const result = await fetch(`https://api.spotify.com/v1/browse/new-releases`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
    const data = await result.json();
    console.log(data);
    return data
}

var spotifyId = "5T6wd1ScvJGSz17zMCugW0?si=b4fc4b38a8a4462c"
var token = localStorage.getItem('token')
console.log(token);
spotifyGenres(token);
spotifyTracks (token);
spotifyNewRelease (token);

apiController();

