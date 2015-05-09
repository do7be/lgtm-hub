var express = require('express');
var app = express();
var server = require('http').createServer(app);

// server configure
app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));


var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
}


// server listen
server.listen(app.get('port'), function () {
  console.log('Server listening at port %d', app.get('port'));
});


// route
app.get('/', function(request, response) {
  response.render('index', { title: 'Hub LGTM' });
});


// Socket.io
var socket_io = require('socket.io');
var io = socket_io.listen(server);

var recommend = {};

io.on('connection', function (socket) {

  socket.on('select image', function (data) {
    console.log(data.img);
    socket.broadcast.emit('add recommend', {
      img: data.img,
    });
  });
});