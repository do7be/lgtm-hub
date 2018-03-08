import React from 'react'
let socket = io()

export class ReloadButton extends React.Component {
  render () {
    return (
      <section
        id='reload_area'
        className='text-center'
        data-toggle='tooltip'
        data-placement='bottom'
        title='Reloading...'
      >
        <button
          type='button'
          id='reload_button'
          className='btn btn-primary btn-large'
          data-action='reload'
          onClick={this.props.handleClickReload}
        >
          Reload
        </button>
      </section>
    )
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
      <div id='recommend_img_area'>
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
        >
          Copy
        </button>
      </div>
    )
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
    this.state = {
      data: props.data,
    }
  }

  render () {
    var recommend = this.state.data.map((img, index) => {
      return (
        <div key={index} className="recommend_img_box_area text-center">
          <Recommend url={img.url} clip_board={img.clip_board}/>
        </div>
      )
    })
    return (
      <div>
        <h2 className="text-center history">Everyone's history</h2>
        {recommend}
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
    this._onCopy = this._onCopy.bind(this)
  }

  _onCopy () {
    socket.emit("select image", {img: this.props.url});
  }

  render () {
    return (
      <div>
        <div className="recommend_img_box">
          <img src={this.props.url}/>
        </div>
        <button type='button' onClick={this._onCopy} data-clipboard-text={this.props.clip_board} className="recommend_lgtm_img_copy btn btn-success btn-small" data-toggle="tooltip" data-placement="bottom" title="Copied">
          Copy
        </button>
      </div>
    )
  }
}

Recommend.defaultProps = {
  url: '',
  clip_board: ''
}
