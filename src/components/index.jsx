import React from 'react'
import { setHandler } from '../clipboard'
let socket = io()

export class ReloadButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = { busy: false }
    this.saveRef = this.saveRef.bind(this)
    this.onClickReload = this.onClickReload.bind(this)
  }

  componentDidUpdate (newProps) {
    if (this.props !== newProps) {
      this.setState({ busy: false })
    }
  }

  render () {
    return (
      <section
        id='reload_area'
        className='text-center'
      >
        <button
          type='button'
          id='reload_button'
          className='btn btn-primary btn-large'
          onClick={this.onClickReload}
          ref={this.saveRef}
          disabled={this.state.busy}
          data-toggle='tooltip'
          data-placement='bottom'
          title='Reloading...'
        >
          Reload
        </button>
      </section>
    )
  }

  onClickReload () {
    this.setState({ busy: true }, () => {
      this.props.handleClickReload()
      $(this.ref).tooltip('show')
      setTimeout(() => {
        $(this.ref).tooltip('destroy')
      }, 1000)
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
      <div id='img_area'>
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
    this.onClickCopy = this.onClickCopy.bind(this)
  }

  render () {
    return (
      <div>
        <div className="img_box">
          <img className="lgtm_img" src={this.props.url}/>
        </div>
        <button
          type='button'
          onClick={this.onClickCopy}
          data-clipboard-text={this.props.clip_board}
          className="lgtm_img_copy btn btn-warning btn-large"
          data-toggle="tooltip"
          data-placement="bottom"
          data-original-title="Copied"
          ref={this.saveRef}
        >
          Copy
        </button>
      </div>
    )
  }

  saveRef (ref) {
    setHandler(ref)
  }

  onClickCopy () {
    this.props.handleClickCopy(this.props.url)
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
      <div id='recommend_img_area'>
        <h2 className="text-center history">Everyone's history</h2>
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
    this.onClickCopy = this.onClickCopy.bind(this)
  }

  render () {
    return (
      <div>
        <div className='recommend_img_box'>
          <img src={this.props.url}/>
        </div>
        <button
          type='button'
          onClick={this.onClickCopy}
          data-clipboard-text={this.props.clip_board}
          className='recommend_lgtm_img_copy btn btn-success btn-small'
          data-toggle='tooltip'
          data-placement='bottom'
          title='Copied'
          ref={this.saveRef}
        >
          Copy
        </button>
      </div>
    )
  }

  saveRef (ref) {
    setHandler(ref)
  }

  onClickCopy () {
    this.props.handleClickCopy(this.props.url)
  }
}

Recommend.defaultProps = {
  url: '',
  clip_board: ''
}
