

var apiController = function () {
    const cliend_Id = `75195b645b894213b9018c1562267908`;
    const client_Secret = `93152cc4c4c84ea7b2ba88d3b693ae4f`;

    const getSpotifyToken = async () => {
        try {
            const result = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (btoa(`${cliend_Id}` + ':' + `${client_Secret}`))
                },
                body: 'grant_type=client_credentials'
            });

            const data = await result.json();
            console.log(data);
            // console.log(data.access_token);
            localStorage.setItem('token', data.access_token);

            return data.access_token;
        } catch (error) {
            console.log(error);
        }
    }
    return getSpotifyToken();
}


// retrieve Genres from data base and append into genre dropdown list
async function spotifyGenres() {
    try {
        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
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


        var logGenreId = function () {
            console.log(genreDroplist.value)
            genreId = data.categories.items[genreDroplist.selectedIndex - 1].id;
            console.log(genreId);
            localStorage.setItem('genreId', genreId)
            spotifyGenrePlaylist(token, genreId)
        }

        genreDroplist.addEventListener('change', logGenreId);
        return data.categories.items;
    } catch (error) {
        console.log(error);
    }

}

async function spotifyGenrePlaylist(token, genreId) {
    try {
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        })
        const data = await result.json();

        // adding playlist to drop down menu
        var playlistDroplist = document.getElementById('playlist-select');
        // clears old list before populating new list
        // playlistDroplist.textContent = "";
        for (var i = 0; i < data.playlists.items.length; i++) {
            pDroplist = document.createElement('option');
            pDroplist.textContent = data.playlists.items[i].name;
            playlistDroplist.append(pDroplist);
        }
        console.log(data);

        function logTracksEndPoint() {
            tracksEndPoint = data.playlists.items[playlistDroplist.selectedIndex - 1].tracks.href;
            console.log(tracksEndPoint);
            localStorage.setItem('tracksEndPoint', tracksEndPoint)
        }
        playlistDroplist.addEventListener('change', logTracksEndPoint);
        playlistDroplist.addEventListener('change', spotifyTracks);
        return data
    } catch (error) {
        console.log(error);
    }
}


// retrieving track information from api
async function spotifyTracks() {
    try {
        var limit = 50;
        var current_page = 1;
        var records_per_page = 10;

        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");
        btn_next.addEventListener('click', nextPage)
        btn_prev.addEventListener('click', prevPage)


        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json();
        changePage(current_page);
        console.log(data);

        // function to display tracks to dom
        function prevPage() {
            if (current_page > 1) {
                current_page--;
                changePage(current_page);
            }
        }

        function nextPage() {
            if (current_page < numPages()) {
                current_page++;
                changePage(current_page);
            }
        }

        function changePage(page) {
            var tracklistEl = document.getElementById('track-list');
            // Clearing tracklist before populating new track list
            tracklistEl.textContent = "";
            var items = data.items;
            for (var i = (page - 1) * records_per_page; i < (page * records_per_page) && i < items.length; i++) {
                newlist = document.createElement('li');
                newlist.setAttribute('href', '#');
                newlist.setAttribute('id', 'track-id');

                newlist.textContent = items[i].track.name;
                tracklistEl.append(newlist);

                // function to log track Id to local storage to be used by the getTrackDetail function
                $('ul li').click(function (e) {
                    trackIndex = $(this).index()

                    trackId = data.items[trackIndex].track.id
                    console.log(trackId)
                    localStorage.setItem('trackId', trackId)
                    spotifyTrack(trackId);
                })
            }

            // Validate page
            if (page < 1) page = 1;
            if (page > numPages()) page = numPages();

            if (page == 1) {
                btn_prev.style.visibility = "hidden";
            } else {
                btn_prev.style.visibility = "visible";
            }

            if (page == numPages()) {
                btn_next.style.visibility = "hidden";
            } else {
                btn_next.style.visibility = "visible";
            }

        }

        function numPages() {
            return Math.ceil(data.items.length / records_per_page);
        }
        return data;
    } catch (error) {
        console.log(error);
    }
}


async function spotifyTrack() {
    try {
        var limit = 10;
        const result = await fetch(`https://api.spotify.com/v1/tracks/${trackId}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json();
        console.log('data result: ' + JSON.stringify(data));
        var trackDetailEl = document.getElementById('track-detail')
        // clears track detail div before populating div with content
        trackDetailEl.textContent = "";



        // function to display selected track to the dom
        function displayTrackDetail() {
            var newTrackdiv = document.createElement('div');
            var newdivforImg = document.createElement('div');
            var img = document.createElement('img');
            var newdivSound = document.createElement('div');
            var sound = document.createElement('audio');

            sound.id = 'audio-player';
            sound.controls = 'controls';
            sound.src = data.preview_url;
            sound.type = 'audio/mpeg';
            var artistname = data.artists[0].name;
            img.src = data.album.images[1].url
            newTrackdiv.textContent = data.album.name;
            newdivforImg.append(img);
            trackDetailEl.append(artistname);
            trackDetailEl.append(newTrackdiv);
            trackDetailEl.append(newdivforImg);
            newdivSound.append(sound)
            trackDetailEl.append(newdivSound);

        }
        displayTrackDetail();
        return data;
    } catch {
        console.log(error);
    }
}


async function spotifyNewRelease(token) {
    try {
        var limit = 40;
        const result = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json();
        console.log(data);
        // function to display new releases to the dom 
        function displayNewReleases() {
            var newReleaseEl = document.getElementById('new-releases')
            for (var i = 0; i < data.albums.items.length; i++) {
                artistname = data.albums.items[i].artists[0].name;
                var newReleasediv = document.createElement('div');
                newReleasediv.className = "column is-one-quarter";
                var namediv = document.createElement('div');
                namediv.className = "columns";
                var artistdiv = document.createElement('div');
                artistdiv.className = "columns";
                var releasediv = document.createElement('div');
                releasediv.className = "columns";
                namediv.textContent = data.albums.items[i].name;
                artistdiv.textContent = data.albums.items[i].artists[0].name
                releasediv.textContent = data.albums.items[i].release_date
                var img = document.createElement('img');
                img.className = "card"
                img.src = data.albums.items[i].images[0].url;
                newReleasediv.append(namediv);
                newReleasediv.append(releasediv);
                newReleasediv.append(artistdiv);
                newReleasediv.append(img);
                newReleaseEl.append(newReleasediv);
            }
        }
        displayNewReleases();

        return data
    } catch {
        console.log(error)
    }
}

// Search for music feature 
var searchEl = document.getElementById("search-music-btn");
var searchInput = document.getElementById('search-music')

async function searchMusic() {
    try {
        const result = await fetch(`https://api.spotify.com/v1/search?q=name:${searchInput.value}&type=track,artist&include_external=audio`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        console.log(data);
        // function to display search results to the dom
        var searchResultsEl = document.getElementById('search-results');

        function displaySearch() {
            searchResultsEl.textContent = "";
            for (var i = 0; i < data.tracks.items.length; i++) {
                var searchlist = document.createElement('li');
                searchlist.className = "searchlist";
                searchlist.textContent = data.tracks.items[i].name;
                searchResultsEl.append(searchlist);
            }
        }
        displaySearch();
        // function to log track Id to local storage to be used by the getTrackDetail function
        $('ul li').click(function (e) {
            trackIndex = $(this).index()
            console.log(trackIndex)

            trackId = data.tracks.items[trackIndex].id;
            console.log(trackId)
            localStorage.setItem('trackId', trackId)
            spotifyTrack(trackId);
        })
    } catch {
        console.log(error);
    }
}

var btnEl = document.getElementById('btn-id')
var token = localStorage.getItem('token')
var tracksEndPoint = localStorage.getItem('tracksEndPoint')
// console.log(token);
spotifyGenres(token);
spotifyNewRelease(token);
apiController();
searchEl.addEventListener('click', searchMusic)