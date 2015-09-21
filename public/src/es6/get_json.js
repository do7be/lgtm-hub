import {Image} from './util/image';

$(function() {

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
});


