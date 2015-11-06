let React = require('react');
let Index = require('../../views/index.js');

// Util Functions for Image
export class Image {

  // init Random Images
  static renderLGTM () {
    this.image_data = [{url: '', clip_board: ''}, {url: '', clip_board: ''}, {url: '', clip_board: ''}];
    this.component_random = React.render(<Index.RandomList data={this.image_data}/>, document.getElementById("img_area"));
  }

  // init Recommend Images
  static renderRecommend (data) {
    this.component_recommend = React.render(<Index.RecommendList data={data} />, document.getElementById("recommend_img_area"));
  }

  // load or reload images
  static loadLgtmImages () {
    $(".lgtm_img").each((i, obj) => {
      $.getJSON("http://www.lgtm.in/g", (data) => {
        this.image_data[i] = {url: data.imageUrl, clip_board: '![LGTM](' + data.imageUrl + ')'};
        this.component_random.setState({data: this.image_data});
      });
    });
  }

  // add other people recommend
  static addRecommendImage (data) {
    let recommend_data = this.component_recommend.state.data;
    recommend_data.push(data);
    if(recommend_data.length > 10) {
      recommend_data.shift();
    }
    this.component_recommend.setState(recommend_data);
  }

  // set handler to button for copy text on clipboard
  static setHandler (i, obj) {
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