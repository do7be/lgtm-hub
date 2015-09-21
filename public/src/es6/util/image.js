export class Image {

  // add other people copied images to display bottom
  static addRecommendImage (img) {
    if ($('.recommend_img_box').length >= 10) {
      $('.recommend_img_box:first').parent().remove();
    }

    let image_url = '![LGTM](' + img + ')';

    let img_box = $('<div class="recommend_img_box"></div>')
      .append('<img src="' + img + '">');

    let recommend_box = $('<div class="text-center"></div>')
      .append(img_box)
      .append('<buttton data-clipboard-text="' + image_url + '" class="recommend_lgtm_img_copy btn btn-success btn-small" data-toggle="tooltip" data-placement="bottom" title="Copied">Copy</button>');

    $('#recommend_img_area').append(recommend_box);
  }

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