const express = require('express');
const sanitize = require('validator');
const request = require ('request');
const compression = require('compression')
const socket_io = require('socket.io');
let app = express();
let server = require('http').createServer(app);

// server configure
app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(compression({level: 6}));
app.use(express.static(__dirname + '/public'));

let env = process.env.NODE_ENV || 'development';
if ('development' == env) {
}

// server listen
server.listen(app.get('port'), function () {
  console.log('Server listening at port %d', app.get('port'));
});

// route
app.get('/', function(request, response) {
  response.render('index', { title: 'LGTM-HUB', production: env === 'production' });
});

// Socket.io
let io = socket_io.listen(server);

let recommend = new Array();

io.on('connection', function (socket) {

  socket.emit('load recommend', recommend);

  // recommend image to other people when user select image
  socket.on('select image', function (data) {

    let img_url = data.img;

    if (checkDataImg(img_url)) {

      img_url = sanitize.toString(img_url);
      let img = {url: img_url, clip_board: "![LGTM](" + img_url + ")"}

      recommend.push(img);
      if(recommend.length > 10) {
        recommend.shift();
      }

      // recommend image to other people
      socket.broadcast.emit('add recommend', img);
    }
  });

  // init load or click reload button
  socket.on('load random', function (data) {
    // call 3 times with async
    let tasks = [
      getJsonLgtmin(),
      getJsonLgtmin(),
      getJsonLgtmin(),
    ];
    Promise.all(tasks).then(function(results) {
      socket.emit('loaded random', results);
    });
  });
});

// request for get images to lgtm.in
function getJsonLgtmin() {
  return new Promise(function(resolve) {
    request(
      {
        method: 'GET',
        uri: 'http://www.lgtm.in/g',
        gzip: true,
        rejectUnauthorized: false,
        headers: {
          "accept": "application/json, */*",
          "accept-encoding": "gzip, deflate",
          "user-agent": "runscope/0.1",
          "connection": "keep-alive"
        }
      }
    , function (error, response, body) {
        resolve(JSON.parse(body));
    });
  });
}

// sanitizing
function checkDataImg (img) {
  if (img.match(/"/) !== null || img.match(/'/) !== null) {
    return false;
  }

  if (img.match(/^http:\/\/lgtm.in\/p\//) === false) {
    return false;
  }

  // check already contain
  let filetered_recommend = recommend.filter(function(recommended, index){
    if (recommended.url == img) {
      return true;
    }
  });
  if(filetered_recommend.length > 0){
    return false;
  }

  return true;
}
