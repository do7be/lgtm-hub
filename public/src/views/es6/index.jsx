let React = require('react');
let socket = io();

// Random LGTM Images
export var RandomList = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data,
    };
  },
  render: function () {
    var images = this.state.data.map((img, index) => {
      return (
        <div key={index} className = "text-center">
          <Random url={img.url} clip_board={img.clip_board}/>
        </div>
      );
    });
    return (
      <div>
        {images}
      </div>
    );
  }
});

// Random LGTM Image
var Random = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
    clip_board: React.PropTypes.string.isRequired
  },
  _onCopy: function () {
    socket.emit("select image", {img: this.props.url});
  },
  render: function () {
    return (
      <div>
        <div className = "img_box">
          <img className = "lgtm_img" src = {this.props.url}/>
        </div>
        <buttton onClick={this._onCopy} data-clipboard-text={this.props.clip_board} className="lgtm_img_copy btn btn-warning btn-large" data-toggle="tooltip" data-placement="bottom" data-original-title="Copied">
          Copy
        </buttton>
      </div>
    );
  }
});


// Other People Recommend Images
export var RecommendList = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data,
    };
  },
  render: function () {
    var recommend = this.state.data.map((img, index) => {
      return (
        <div key={index} className = "recommend_img_box_area text-center">
          <Recommend url={img.url} clip_board={img.clip_board}/>
        </div>
      );
    });
    return (
      <div>
        <h2 className = "text-center history">Everyone's history</h2>
        {recommend}
      </div>
    );
  }
});

// Other People Recommend Image
var Recommend = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
    clip_board: React.PropTypes.string.isRequired
  },
  _onCopy: function () {
    socket.emit("select image", {img: this.props.url});
  },
  render: function () {
    return (
      <div>
        <div className = "recommend_img_box">
          <img src = {this.props.url}/>
        </div>
        <buttton onClick={this._onCopy} data-clipboard-text={this.props.clip_board} className="recommend_lgtm_img_copy btn btn-success btn-small" data-toggle="tooltip" data-placement="bottom" title="Copied">
          Copy
        </buttton>
      </div>
    );
  }
});
