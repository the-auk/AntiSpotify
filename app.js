const logger = require('morgan');
var express = require('express'); 
var request = require('request'); 
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


var usersid='';
var stateKey = 'spotify_auth_state';

var client_id = '3054cb711c3c4fc48cff3458cdaddea2'; 
var client_secret = 'b43bf5c8fe0040829f0029ac301a5ea7';
var redirect_uri = 'http://tanmaysiwach.com';

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());
   
// app.post('/login', function(req, res){
//   console.log("node works");
// });


app.get('/login', function(req, res) {
  console.log('ABCD');
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;
        tokenuse = access_token;
        spotifyApi.setAccessToken(access_token);

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
          userid = body.id;
          usersid = body.id;
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
  
});

app.get('/refresh_token', function(req, res) {
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

let artists = [];
app.get('/playlists', function(req,res){
  //getArtist('4O15NlyKLIASxsJ0PrXPfz');
  spotifyApi.getUserPlaylists(usersid)
  .then(function(data) {
    res.send(data.body);
    for (let playlist of data.body.items) {
      //console.log(playlist.name + " " + playlist.id) 
      let tracks = getPlaylistTracks(playlist.id, playlist.name);
      const tracksJSON = { tracks }
      let data = JSON.stringify(tracksJSON);
      
      //console.log(data);
    }
  },function(err) {
    console.log('Something went wrong!', err);
  });

  async function getPlaylistTracks(playlistId, playlistName) {

    const data = await spotifyApi.getPlaylistTracks(playlistId, {
      offset: 0,
      limit: 100,
      fields: 'items'
    })
    let tracks = [];
    
    for (let track_obj of data.body.items) {
      const track = track_obj.track
      console.log(track_obj.track.artists);
      tracks.push(track);
      artists.push(track.artists[0].id);
      console.log(track.name + " : " + track.artists[0].name + track.artists[0].id);
    }
    getArtist('4O15NlyKLIASxsJ0PrXPfz');
    console.log("---------------+++++++++++++++++++++++++");
    return tracks;
  }
});

function getArtist(artistId){
spotifyApi.getArtist(artistId)
  .then(function(data) {
    //console.log('Artist information', data.body);
    console.log(data.body.name);
    console.log("Genres: " + data.body.genres);
  }, function(err) {
    console.error(err);
  });
}

console.log('Listening on 8888');
app.listen(8888);
