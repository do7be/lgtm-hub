import React from 'react'
import ReactDOM from 'react-dom'
import { RandomList, RecommendList } from './index.jsx'

// Util Functions for Image
export class Image {

  // init Random Images
  static renderLGTM () {
    this.image_data = [{url: '', clip_board: ''}, {url: '', clip_board: ''}, {url: '', clip_board: ''}];
    this.component_random = ReactDOM.render(<RandomList data={this.image_data}/>, document.getElementById("img_area"));
  }

  // init Recommend Images
  static renderRecommend (data) {
    this.component_recommend = ReactDOM.render(<RecommendList data={data} />, document.getElementById("recommend_img_area"));
  }

  // load or reload images
  static loadLgtmImages (socket) {
    socket.emit("load random");
  }

  // render random lgtm images
  static renderLgtmImages (data) {
    let image_data = [];
    data.forEach(function (obj) {
      image_data.push({url: obj.imageUrl, clip_board: '![LGTM](' + obj.imageUrl + ')'});
    });
    this.component_random.setState({data: image_data});
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
