import {Image} from './components/image'

import React from 'react'

// socket.io emit and bind
function setup () {
  let socket = io();

  // load recommend images to display bottom at initialize
  $(".recommend_lgtm_img_copy").each((i, obj) => {
    Image.setHandler(i, obj);
  });

  $(".recommend_lgtm_img_copy").each((i, obj) => {
    Image.setHandler(i, obj)
  })

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
    }, 1000)
  })
}
export default setup
