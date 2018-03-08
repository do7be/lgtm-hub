// Util Functions for Image
export function setHandler (obj) {
  if (obj === null) {
    return
  }

  // copy github form url to clipboard
  const client = new ClipboardJS(obj)
  client.on('success', event => {
    $(obj).tooltip('show')
    setTimeout(() => {
      $(obj).tooltip('destroy')
    }, 1000)
  })
}
