$(function(){

  var socket = io();

  $('.lgtm_img_copy').on('click', function() {
    socket.emit("select image", {img: $(this).prev().children('img').attr('src')});
  });

  socket.on('add recommend', function (data) {
    var image_url = '![LGTM](' + data.imageUrl + ')';

    var img_box = $('<div class="recommend_img_box"></div>')
      .append('<img src="' + data.img + '">');

    var recommend_box = $('<div class="text-center"></div>')
      .append(img_box)
      .append('<buttton data-clipboard-text="' + image_url + '" class="lgtm_img_copy btn btn-warning btn-small" data-toggle="tooltip" data-placement="bottom" title="Copied">Copy</button>');

    $('#recommend_img_area')
      .append(recommend_box);
  });
});

