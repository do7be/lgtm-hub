import classNames from 'classnames'

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { selectImage } from '../actions'

import * as style from './Image.scss'

import Check from './check.svg'

class Image extends React.Component {
  constructor (props) {
    super(props)
    this.state = { copyAnimation: false }
    this.onClickCopy = this.onClickCopy.bind(this)
    this.refToClipBoard = this.refToClipBoard.bind(this)
  }

  render () {
    const { small } = this.props
    return (
      <div className={classNames(style.container, small && style.small)}>
        <button
          type='button'
          onClick={this.onClickCopy}
          data-clipboard-text={this.props.clip_board}
          className={classNames(style.copyButton, this.state.copyAnimation && style.copied)}
          ref={this.refToClipBoard}
        >
          <img src={this.props.url} className={style.image}/>
          <div className={style.border}/>
          <div className={style.copiedNotice}>
            <Check width={72} height={72} className={style.check}/>
            <span className={style.text}>Copied</span>
          </div>
        </button>
      </div>
    )
  }

  refToClipBoard (ref) {
    if (ref === null) { return }

    const client = new ClipboardJS(ref)
    client.on('success', event => { /* noop */ })
  }

  onClickCopy () {
    this.props.actions.selectImage({ img: this.props.url })

    this.setState({ copyAnimation: true }, () => {
      setTimeout(() => {
        this.setState({ copyAnimation: false })
      }, 1600)
    })
  }
}

Image.defaultProps = {
  url: '',
  clip_board: '',
  small: false
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ selectImage }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Image)
