import { Tooltip } from 'react-tippy'
import React from 'react'

class Image extends React.Component {
  constructor (props) {
    super(props)
    this.state = { openTooltip: false }
    this.onClickCopy = this.onClickCopy.bind(this)
    this.refToClipBoard = this.refToClipBoard.bind(this)
  }

  render () {
    return (
      <div>
        <div className="img_box">
          <img className="lgtm_img" src={this.props.url}/>
        </div>
        {/* buttonはコンポーネント化したい */}
        <Tooltip
          title='Copied'
          position='bottom'
          trigger='manual'
          open={this.state.openTooltip}
          hideDelay={100}
          arrow
        >
          <button
            type='button'
            onClick={this.onClickCopy}
            data-clipboard-text={this.props.clip_board}
            className="lgtm_img_copy btn btn-warning btn-large"
            ref={this.refToClipBoard}
          >
            Copy
          </button>
        </Tooltip>
      </div>
    )
  }

  refToClipBoard (ref) {
    if (ref === null) { return }

    const client = new ClipboardJS(ref)
    client.on('success', event => { /* noop */ })
  }

  onClickCopy () {
    this.props.handleClickCopy(this.props.url)

    this.setState({ openTooltip: true }, () => {
      setTimeout(() => {
        this.setState({ openTooltip: false })
      }, 1000)
    })
  }
}

Image.defaultProps = {
  url: '',
  clip_board: ''
}

export default Image
