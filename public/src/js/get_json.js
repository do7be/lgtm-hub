$(function(){
  // 画面読み込み時に画像を読み込んで表示しておく
  loadLgtmImages()
  $('[data-action=reload]').on('click', function() {
    loadLgtmImages();
  });

  // copy button handler
  $(".lgtm_img_copy").each(function(i, this_obj){
    // copy github form url to clipboard
    var client = new ZeroClipboard( this_obj );
    client.on( "ready", function( readyEvent ) {
      client.on( "aftercopy", function( event ) {
        $(this_obj).tooltip('show');
        setTimeout( function () {
          $(this_obj).tooltip('destroy');
        } , 1000 );
      });
    });
  });
});

function loadLgtmImages(){
  $(".lgtm_img").each(function(i, this_obj){
    $.getJSON("http://www.lgtm.in/g", function (data) {

      // add lgtm url to textarea
      $("textarea")
        .append("\n\n" + data.markdown);

      // add lgtm image to display
      $(this_obj)
        .attr('src', data.imageUrl)
        .parent().next().attr('data-clipboard-text', '![LGTM](' + data.imageUrl + ')');
    });
  });
}

