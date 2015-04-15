$(function(){
  $('[data-action=reload]').on('click', function() {
    $.getJSON("http://www.lgtm.in/g", function (data) {
      $("textarea").
        append("\n\n" + data.markdown);
        console.log(data);
      $("body").
        append("<img src=" + data.imageUrl + ">");
    });
  });
});