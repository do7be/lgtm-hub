'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utilImage = require('./util/image');

var Image = _interopRequireWildcard(_utilImage);

$(function () {
  // initialize load
  Image.loadLgtmImages();

  // initialize tooltip
  $('button').tooltip('destroy');

  // click reload button
  $('[data-action=reload]').on('click', function () {
    var _this = this;

    // show tooltip
    $(this).tooltip('show');
    setTimeout(function () {
      $(_this).tooltip('destroy');
    }, 1000);

    // disable reload button for 1000ms
    $(this).prop("disabled", true);
    setTimeout(function () {
      $(_this).prop("disabled", false);
    }, 1000);

    Image.loadLgtmImages();
  });

  // copy button handler
  $(".lgtm_img_copy").each(function (i, obj) {
    setHandler(i, obj);
  });
});

function setHandler(i, obj) {
  // copy github form url to clipboard
  var client = new ZeroClipboard(obj);
  client.on("ready", function (readyEvent) {
    client.on("aftercopy", function (event) {
      $(obj).tooltip('show');
      setTimeout(function () {
        $(obj).tooltip('destroy');
      }, 1000);
    });
  });
};