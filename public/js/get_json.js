$(function(){
  $('[data-action=reload]').on('click', function() {
    $(".lgtm_img").each(function(i, this_obj){
      $.getJSON("http://www.lgtm.in/g", function (data) {
        $("textarea")
          .append("\n\n" + data.markdown);
        $(this_obj)
          .attr('src', data.imageUrl)
          .attr('copy', '![LGTM](' + data.imageUrl + ')');
      });
    });
  });
});