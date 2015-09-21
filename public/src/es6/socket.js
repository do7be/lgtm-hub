import {Image} from './util/image';

// socket.io emit and bind
$(function() {

  let socket = io();

  $('.lgtm_img_copy').on('click', function () {
    socket.emit("select image", {img: $(this).prev().children('img').attr('src')});
  });

  // load recommend images to display bottom at initialize
  socket.on('load recommend', (data) => {
    let image_num = data.length;
    for (let i = 0; i < image_num; i++) {
      Image.addRecommendImage(data[i]);
    }
    $(".recommend_lgtm_img_copy").each((i, obj) => {
      Image.setHandler(i, obj);
    });
  });

  // load recommend images to display bottom at other people copy
  socket.on('add recommend', function (data) {
    Image.addRecommendImage(data.img);
  });
});

