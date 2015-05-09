$(function(){

  var socket = io();

  $('.lgtm_img_copy').on('click', function() {
    socket.emit("select image", {img: $(this).prev().children('img').attr('src')});
  });

  socket.on('add recommend', function (data) {
    $('#recommend_img_area').append('<img src="' + data.img + '">');
  });
});

