'use strict';

var express = require('express');
var sanitize = require('validator');
var request = require('request');
var compression = require('compression');
var socket_io = require('socket.io');
var app = express();
var server = require('http').createServer(app);

// server configure
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// cache in 30days
var maxTime = 86400000 * 30;
app.use(compression({ level: 6 }));
app.use(express['static'](__dirname + '/public', { maxAge: maxTime }));

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {}

// server listen
server.listen(app.get('port'), function () {
  console.log('Server listening at port %d', app.get('port'));
});

// route
app.get('/', function (request, response) {
  response.render('index', { title: 'LGTM-HUB' });
});

// Socket.io
var io = socket_io.listen(server);

var recommend = new Array();

io.on('connection', function (socket) {

  socket.emit('load recommend', recommend);

  // recommend image to other people when user select image
  socket.on('select image', function (data) {

    var img_url = data.img;

    if (checkDataImg(img_url)) {

      img_url = sanitize.toString(img_url);
      var img = { url: img_url, clip_board: "![LGTM](" + img_url + ")" };

      recommend.push(img);
      if (recommend.length > 10) {
        recommend.shift();
      }

      // recommend image to other people
      socket.broadcast.emit('add recommend', img);
    }
  });

  // init load or click reload button
  socket.on('load random', function (data) {
    // call 3 times with async
    var tasks = [getJsonLgtmin(), getJsonLgtmin(), getJsonLgtmin()];
    Promise.all(tasks).then(function (results) {
      socket.emit('loaded random', results);
    });
  });
});

// request for get images to lgtm.in
function getJsonLgtmin() {
  return new Promise(function (resolve) {
    request({
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
    }, function (error, response, body) {
      resolve(JSON.parse(body));
    });
  });
}

// sanitizing
function checkDataImg(img) {
  if (img.match(/"/) !== null || img.match(/'/) !== null) {
    return false;
  }

  if (img.match(/^http:\/\/lgtm.in\/p\//) === false) {
    return false;
  }

  // check already contain
  var filetered_recommend = recommend.filter(function (recommended, index) {
    if (recommended.url == img) {
      return true;
    }
  });
  if (filetered_recommend.length > 0) {
    return false;
  }

  return true;
}