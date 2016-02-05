let express = require('express');
let sanitize = require('validator');
let app = express();
let server = require('http').createServer(app);

// server configure
app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

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
  response.render('index', { title: 'LGTM-HUB' });
});

// Socket.io
let socket_io = require('socket.io');
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
});

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
