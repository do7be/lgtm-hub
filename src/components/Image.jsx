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
  }

  render () {
    const { small, url } = this.props
    return (
      <div className={classNames(style.container, small && style.small)}>
        <button
          type='button'
          onClick={this.onClickCopy}
          data-clipboard-text={`![LGTM](${url})`}
          className={classNames(style.copyButton, this.state.copyAnimation && style.copied)}
          ref={this.refToClipBoard}
        >
          <div className={style.imageContainer}>
            <img src={url} className={style.image}/>
            <div className={style.border}/>
            <div className={style.copiedNotice}>
              <Check width={72} height={72} className={style.check}/>
              <span className={style.text}>Copied</span>
            </div>
          </div>
        </button>
      </div>
    )
  }

  refToClipBoard = (ref) => {
    if (ref === null) { return }

    const client = new ClipboardJS(ref)
    client.on('success', event => { /* noop */ })
  }

  onClickCopy = () => {
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
  small: false
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ selectImage }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Image)
