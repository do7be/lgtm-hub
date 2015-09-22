import {Image} from './util/image';

let React = require('react');
let Index = require('../views/index.js');

// socket.io emit and bind
$(function() {

  let socket = io();

  // load recommend images to display bottom at initialize
  socket.on('load recommend', (data) => {
    Image.renderRecommend(data);
    $(".recommend_lgtm_img_copy").each((i, obj) => {
      Image.setHandler(i, obj);
    });
  });

  // load recommend images to display bottom at other people copy
  socket.on('add recommend', function (data) {
    Image.addRecommendImage(data);
    $(".recommend_lgtm_img_copy").each((i, obj) => {
      Image.setHandler(i, obj);
    });
  });
});

