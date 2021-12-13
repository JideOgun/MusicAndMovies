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
    return data.access_token;
}


return getSpotifyToken();
}
const _getGenres = async (token) => {

    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    console.log(data)
    return data.categories.items;
}

var token = "BQAS4rWEX0utYWLcgKpaeL_vEwXEEbV_bHlYaLsKbjvV5a7WDgEyDx73DYKfafRd51vqTdBqSEkTZF41iC4"
_getGenres(token);
apiController();

