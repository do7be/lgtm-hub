import classNames from 'classnames'

import { Tooltip } from 'react-tippy'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { selectImage } from '../actions'

import * as style from './Image.scss'

class Image extends React.Component {
  constructor (props) {
    super(props)
    this.state = { openTooltip: false }
    this.onClickCopy = this.onClickCopy.bind(this)
    this.refToClipBoard = this.refToClipBoard.bind(this)
  }

  render () {
    const { small } = this.props
    return (
      <div>
        <div className={classNames(style.imgBox, small && style.small)}>
          <img className={style.lgtmImg} src={this.props.url}/>
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
            data-clipboard-text={`![LGTM](${this.props.url})`}
            className={classNames(!small && style.lgtmImgCopy, 'btn', 'btn-warning', small ? 'btn-small' : 'btn-large')}
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
    this.props.actions.selectImage({ img: this.props.url })

    this.setState({ openTooltip: true }, () => {
      setTimeout(() => {
        this.setState({ openTooltip: false })
      }, 1000)
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
