import {Image} from './util/image';

$(function() {

  // initialize load
  Image.renderLGTM();
  Image.loadLgtmImages();

  // initialize tooltip
  $('button').tooltip('destroy');

  // copy button handler
  $(".lgtm_img_copy").each((i, obj) => {
    Image.setHandler(i, obj);
  });
});
