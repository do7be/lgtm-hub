import React from 'react'
import { Tooltip } from 'react-tippy'

let socket = io()

export class ReloadButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = { busy: false, openTooltip: false }
    this.saveRef = this.saveRef.bind(this)
    this.onClickReload = this.onClickReload.bind(this)
  }

  componentDidUpdate (newProps) {
    if (this.props !== newProps) {
      this.setState({ busy: false, openTooltip: false })
    }
  }

  render () {
    return (
      <section className='reload_area text-center'>
        <Tooltip
          title='Reloading...'
          position='bottom'
          trigger='manual'
          open={this.state.openTooltip}
          hideDelay={100}
          arrow
        >
          <button
            type='button'
            className='reload_button btn btn-primary btn-large'
            onClick={this.onClickReload}
            ref={this.saveRef}
            disabled={this.state.busy}
          >
            Reload
          </button>
        </Tooltip>
      </section>
    )
  }

  onClickReload () {
    this.setState({ busy: true, openTooltip: true }, () => {
      this.props.handleClickReload()
    })
  }

  saveRef (ref) {
    this.ref = ref
  }
}

// Random LGTM Images
export class RandomList extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='img_area'>
        {this.props.data.map(img => (
          <div
            key={img.url}
            className='text-center'
          >
            <Random url={img.url} clip_board={img.clip_board} handleClickCopy={this.props.handleClickCopy}/>
          </div>
        ))}
      </div>
    )
  }
}

RandomList.defaultProps = {
  data: []
}

// Random LGTM Image
class Random extends React.Component {
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

Random.defaultProps = {
  url: '',
  clip_board: ''
}

// Other People Recommend Images
export class RecommendList extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='recommend_img_area'>
        <h2 className='text-center history'>Everyone's history</h2>
        {this.props.data.map(img => (
          <div key={img.url} className='recommend_img_box_area text-center'>
            <Recommend url={img.url} clip_board={img.clip_board} handleClickCopy={this.props.handleClickCopy}/>
          </div>
        ))}
      </div>
    )
  }
}

RecommendList.defaultProps = {
  data: []
}

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
