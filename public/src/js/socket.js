$(function(){

  var socket = io();

  $('.lgtm_img_copy').on('click', function() {
    socket.emit("select image", {img: $(this).prev().children('img').attr('src')});
  });

  socket.on('load recommend', function (data) {
    var image_num = data.length;
    for (var i=0; i<image_num; i++) {
      addRecommendImage(data[i]);
    }
  });

  socket.on('add recommend', function (data) {
    addRecommendImage(data.img);
  });

  function addRecommendImage (img) {
    var image_url = '![LGTM](' + img + ')';

    var img_box = $('<div class="recommend_img_box"></div>')
      .append('<img src="' + img + '">');

    var recommend_box = $('<div class="text-center"></div>')
      .append(img_box)
      .append('<buttton data-clipboard-text="' + image_url + '" class="lgtm_img_copy btn btn-warning btn-small" data-toggle="tooltip" data-placement="bottom" title="Copied">Copy</button>');

    $('#recommend_img_area')
      .append(recommend_box);
  }
});

