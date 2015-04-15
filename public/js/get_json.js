$(function(){
  $('[data-action=reload]').on('click', function() {
    $(".lgtm_img").each(function(i, this_obj){
      $.getJSON("http://www.lgtm.in/g", function (data) {

        // add lgtm url to textarea
        $("textarea")
          .append("\n\n" + data.markdown);

        // add lgtm image to display
        $(this_obj)
          .attr('src', data.imageUrl)
          .attr('data-clipboard-text', '![LGTM](' + data.imageUrl + ')');

        // copy github form url to clipboard
        var client = new ZeroClipboard( this_obj );
        client.on( "ready", function( readyEvent ) {
          client.on( "aftercopy", function( event ) {
            alert("Copied!: " + event.data["text/plain"] );
          });
        });
      });
    });
  });
});