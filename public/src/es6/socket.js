$(function(){

  var socket = io();

  $('.lgtm_img_copy').on('click', function () {
    socket.emit("select image", {img: $(this).prev().children('img').attr('src')});
  });

  socket.on('load recommend', (data) => {
    let image_num = data.length;
    for (let i = 0; i < image_num; i++) {
      addRecommendImage(data[i]);
    }
    $(".recommend_lgtm_img_copy").each((i, obj) => {
      setHandler(i, obj);
    });
  });

  socket.on('add recommend', function (data) {
    addRecommendImage(data.img);
  });

  function addRecommendImage (img) {
    if ($('.recommend_img_box').length >= 10) {
      $('.recommend_img_box:first').parent().remove();
    }

    let image_url = '![LGTM](' + img + ')';

    let img_box = $('<div class="recommend_img_box"></div>')
      .append('<img src="' + img + '">');

    let recommend_box = $('<div class="text-center"></div>')
      .append(img_box)
      .append('<buttton data-clipboard-text="' + image_url + '" class="recommend_lgtm_img_copy btn btn-success btn-small" data-toggle="tooltip" data-placement="bottom" title="Copied">Copy</button>');

    $('#recommend_img_area').append(recommend_box);
  }
});

