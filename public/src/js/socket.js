'use strict';

$(function () {

  var socket = io();

  $('.lgtm_img_copy').on('click', function () {
    socket.emit("select image", { img: $(this).prev().children('img').attr('src') });
  });

  socket.on('load recommend', function (data) {
    var image_num = data.length;
    for (var i = 0; i < image_num; i++) {
      Image.addRecommendImage(data[i]);
    }
    $(".recommend_lgtm_img_copy").each(function (i, obj) {
      setHandler(i, obj);
    });
  });

  socket.on('add recommend', function (data) {
    Image.addRecommendImage(data.img);
  });
});