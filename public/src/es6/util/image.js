// Util Functions for Image
export class Image {

  // load or reload images
  static loadLgtmImages() {
    $(".lgtm_img").each((i, obj) => {
      $.getJSON("http://www.lgtm.in/g", (data) => {

        // add lgtm url to textarea
        $("textarea")
          .append("\n\n" + data.markdown);

        // add lgtm image to display
        $(obj)
          .attr('src', data.imageUrl)
          .parent().next().attr('data-clipboard-text', '![LGTM](' + data.imageUrl + ')');
      });
    });
  }

  // set handler to button for copy text on clipboard
  static setHandler(i, obj) {
    // copy github form url to clipboard
    let client = new ZeroClipboard(obj);
    client.on("ready", function(readyEvent) {
      client.on("aftercopy", function(event) {
        $(obj).tooltip('show');
        setTimeout(() => {
          $(obj).tooltip('destroy');
        }, 1000);
      });
    });
  };
}