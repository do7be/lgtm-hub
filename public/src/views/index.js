"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var React = require('react');
var socket = io();

// Random LGTM Images
var RandomList = React.createClass({
  displayName: "RandomList",

  getInitialState: function getInitialState() {
    return {
      data: this.props.data
    };
  },
  render: function render() {
    var images = this.state.data.map(function (img, index) {
      return React.createElement(
        "div",
        { key: index, className: "text-center" },
        React.createElement(Random, { url: img.url, clip_board: img.clip_board })
      );
    });
    return React.createElement(
      "div",
      null,
      images
    );
  }
});

exports.RandomList = RandomList;
// Random LGTM Image
var Random = React.createClass({
  displayName: "Random",

  propTypes: {
    url: React.PropTypes.string.isRequired,
    clip_board: React.PropTypes.string.isRequired
  },
  _onCopy: function _onCopy() {
    socket.emit("select image", { img: this.props.url });
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "img_box" },
        React.createElement("img", { className: "lgtm_img", src: this.props.url })
      ),
      React.createElement(
        "buttton",
        { onClick: this._onCopy, "data-clipboard-text": this.props.clip_board, className: "lgtm_img_copy btn btn-warning btn-large", "data-toggle": "tooltip", "data-placement": "bottom", "data-original-title": "Copied" },
        "Copy"
      )
    );
  }
});

// Other People Recommend Images
var RecommendList = React.createClass({
  displayName: "RecommendList",

  getInitialState: function getInitialState() {
    return {
      data: this.props.data
    };
  },
  render: function render() {
    var recommend = this.state.data.map(function (img, index) {
      return React.createElement(
        "div",
        { key: index, className: "recommend_img_box_area text-center" },
        React.createElement(Recommend, { url: img.url, clip_board: img.clip_board })
      );
    });
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        { className: "text-center" },
        "Other People Recommend"
      ),
      recommend
    );
  }
});

exports.RecommendList = RecommendList;
// Other People Recommend Image
var Recommend = React.createClass({
  displayName: "Recommend",

  propTypes: {
    url: React.PropTypes.string.isRequired,
    clip_board: React.PropTypes.string.isRequired
  },
  _onCopy: function _onCopy() {
    socket.emit("select image", { img: this.props.url });
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "recommend_img_box" },
        React.createElement("img", { src: this.props.url })
      ),
      React.createElement(
        "buttton",
        { onClick: this._onCopy, "data-clipboard-text": this.props.clip_board, className: "recommend_lgtm_img_copy btn btn-success btn-small", "data-toggle": "tooltip", "data-placement": "bottom", title: "Copied" },
        "Copy"
      )
    );
  }
});