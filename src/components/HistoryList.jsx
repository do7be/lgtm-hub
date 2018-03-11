import React from 'react'
import Image from './Image'

export class HistoryList extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='recommend_img_area'>
        <h2 className='text-center history'>Everyone's history</h2>
        {this.props.data.map(img => (
          <div key={img.url} className='recommend_img_box_area text-center'>
            <Image url={img.url} clip_board={img.clip_board} handleClickCopy={this.props.handleClickCopy}/>
          </div>
        ))}
      </div>
    )
  }
}

HistoryList.defaultProps = {
  data: []
}

export default HistoryList

// Other People Recommend Image
class Recommend extends React.Component {
  constructor (props) {
    super(props)
    this.state = { openTooltip: false }
    this.onClickCopy = this.onClickCopy.bind(this)
    this.refToClipBoard = this.refToClipBoard.bind(this)
  }

  render () {
    return (
      <div>
        <div className='recommend_img_box'>
          <img src={this.props.url}/>
        </div>
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
            className='recommend_lgtm_img_copy btn btn-success btn-small'
            data-toggle='tooltip'
            data-placement='bottom'
            title='Copied'
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

Recommend.defaultProps = {
  url: '',
  clip_board: ''
}
