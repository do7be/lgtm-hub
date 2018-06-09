import classNames from 'classnames'

import React from 'react'
import { connect } from 'react-redux'

import { addHistory, selectImage } from '../actions'

import * as style from './Image.scss'

import clipboard from 'clipboard'

import Check from './check.svg'

interface OwnProps {
  url: string
  small?: boolean
}

type Props = OwnProps & typeof mapDispatchToProps

interface State {
  copyAnimation: boolean
}

class Image extends React.Component<Props, State> {
  static defaultProps: OwnProps = {
    url: '',
    small: false
  }
  readonly state: Readonly<State> = {
    copyAnimation: false
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

  refToClipBoard = (ref: HTMLButtonElement|null) => {
    if (ref === null) { return }

    const client = new clipboard(ref)
    client.on('success', (_event: clipboard.Event) => { /* noop */ })
  }

  onClickCopy = async () => {
    this.props.addHistory(this.props.url)
    void this.props.selectImage({ img: this.props.url })

    this.setState({ copyAnimation: true }, () => {
      setTimeout(() => {
        this.setState({ copyAnimation: false })
      }, 1600)
    })
  }
}

const mapDispatchToProps = {
  addHistory,
  selectImage
}

export default connect(null, mapDispatchToProps)(Image)
