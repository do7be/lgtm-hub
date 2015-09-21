import {Image} from './util/image';

$(function() {
  // initialize load
  Image.loadLgtmImages();

  // initialize tooltip
  $('button').tooltip('destroy');

  // click reload button
  $('[data-action=reload]').on('click', function() {

    // show tooltip
    $(this).tooltip('show');
    setTimeout(() => {
      $(this).tooltip('destroy');
    }, 1000);

    // disable reload button for 1000ms
    $(this).prop("disabled", true);
    setTimeout(() => {
      $(this).prop("disabled", false);
    }, 1000);

    Image.loadLgtmImages();
  });

  // copy button handler
  $(".lgtm_img_copy").each((i, obj) => {
    Image.setHandler(i, obj);
  });
});


