import {Image} from './util/image';

let React = require('react');
let Index = require('../views/index.js');
let component_recommend;

// socket.io emit and bind
$(function() {

  let socket = io();

  $('.lgtm_img_copy').on('click', function () {
    socket.emit("select image", {img: $(this).prev().children('img').attr('src')});
  });

  // load recommend images to display bottom at initialize
  socket.on('load recommend', (data) => {

    component_recommend = React.render(<Index.RecommendList data={data} />, document.getElementById("recommend_img_area"));

    $(".recommend_lgtm_img_copy").each((i, obj) => {
      Image.setHandler(i, obj);
    });
  });

  // load recommend images to display bottom at other people copy
  socket.on('add recommend', function (data) {
    let recommend_data = component_recommend.state.data;
    recommend_data.push(data);
    if(recommend_data.length > 10) {
      recommend_data.shift();
    }

    component_recommend.setState(recommend_data);
  });
});

