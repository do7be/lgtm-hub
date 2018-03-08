import React from 'react'
import ReactDOM from 'react-dom'

// Util Functions for Image
export class Image {
  // set handler to button for copy text on clipboard
  static setHandler (i, obj) {
    // copy github form url to clipboard
    const client = new ClipboardJS(obj);
    client.on("success", function(event) {
      $(obj).tooltip('show');
      setTimeout(() => {
        $(obj).tooltip('destroy');
      }, 1000);
    });
  };
}
