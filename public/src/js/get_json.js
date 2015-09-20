'use strict';

$(function () {
  // initialize load
  loadLgtmImages();

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

    loadLgtmImages();
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

function loadLgtmImages() {
  $(".lgtm_img").each(function (i, obj) {
    $.getJSON("http://www.lgtm.in/g", function (data) {

      // add lgtm url to textarea
      $("textarea").append("\n\n" + data.markdown);

      // add lgtm image to display
      $(obj).attr('src', data.imageUrl).parent().next().attr('data-clipboard-text', '![LGTM](' + data.imageUrl + ')');
    });
  });
}