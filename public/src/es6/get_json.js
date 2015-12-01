import {Image} from './util/image';

$(function() {

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

    Image.loadLgtmImages();
  });
});


