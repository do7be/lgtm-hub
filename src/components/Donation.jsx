import classNames from 'classnames'
import React from 'react'

import { Tooltip } from 'react-tippy'

import * as style from './Donation.scss'

import qr from './wallet.png'

const address = 'qquk3v3ff096prnnffyeux8mqd0frshq9qr4s93wuz'
export default class Donation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showTooltip: false
    }
  }

  render () {
    return (
      <div className={style.donation}>
        <img className={style.qr} src={qr}/>
        <div className={style.addressContainer}>
          <p className={style.description}>Make a donation with BCH</p>
          <p className={style.address}>{address}</p>
          <Tooltip
            title='Copied'
            position='bottom'
            trigger='manual'
            open={this.state.showTooltip}
            arrow
          >
            <button
              className={style.button}
              data-clipboard-text={address}
              ref={this.refToClipBoard}
              onClick={this.handleClick}
            >
              Copy address
            </button>
          </Tooltip>
        </div>
      </div>
    )
  }

  refToClipBoard = (ref) => {
    if (ref === null) { return }

    const client = new ClipboardJS(ref)
    client.on('success', event => { /* noop */ })
  }

  handleClick = () => {
    this.setState({ showTooltip: true }, () => {
      setTimeout(() => {
        this.setState({ showTooltip: false })
      }, 1600)
    })
  }
}
