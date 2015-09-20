'use strict';

$(function () {

  var socket = io();

  $('.lgtm_img_copy').on('click', function () {
    socket.emit("select image", { img: $(this).prev().children('img').attr('src') });
  });

  socket.on('load recommend', function (data) {
    var image_num = data.length;
    for (var i = 0; i < image_num; i++) {
      addRecommendImage(data[i]);
    }
    $(".recommend_lgtm_img_copy").each(function (i, this_obj) {
      setHandler(i, this_obj);
    });
  });

  socket.on('add recommend', function (data) {
    addRecommendImage(data.img);
  });

  function addRecommendImage(img) {
    if ($('.recommend_img_box').length >= 10) {
      $('.recommend_img_box:first').parent().remove();
    }

    var image_url = '![LGTM](' + img + ')';

    var img_box = $('<div class="recommend_img_box"></div>').append('<img src="' + img + '">');

    var recommend_box = $('<div class="text-center"></div>').append(img_box).append('<buttton data-clipboard-text="' + image_url + '" class="recommend_lgtm_img_copy btn btn-success btn-small" data-toggle="tooltip" data-placement="bottom" title="Copied">Copy</button>');

    $('#recommend_img_area').append(recommend_box);
  }
});