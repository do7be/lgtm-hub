import {Image} from './util/image';

let React = require('react');
let Index = require('../views/es6/index.jsx');

// socket.io emit and bind
function setup () {
  let socket = io();
  Image.loadLgtmImages(socket);

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

  // loaded random images to init or click reload button
  socket.on('loaded random', (data) => {
    Image.renderLgtmImages(data);
  });

  // click reload button
  $('[data-action=reload]').on('click', function() {

    let $reload_area = $('#reload_area');

    // show tooltip
    $($reload_area).tooltip('show');
    setTimeout(() => {
      $($reload_area).tooltip('destroy');
    }, 1000);

    // disable reload button for 1000ms
    $(this).prop("disabled", true);
    setTimeout(() => {
      $(this).prop("disabled", false);
    }, 1000);

    Image.loadLgtmImages(socket);
  });
}
export default setup
