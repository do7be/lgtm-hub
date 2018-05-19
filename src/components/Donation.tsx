import React from 'react'

import clipboard from 'clipboard'

import { Tooltip } from 'react-tippy'

import * as style from './Donation.scss'

import qr from './wallet.png'

interface Props {}

interface State {
  showTooltip: boolean
}

const address = 'qquk3v3ff096prnnffyeux8mqd0frshq9qr4s93wuz'
export default class Donation extends React.Component<Props, State> {
  readonly state: Readonly<State> = {
    showTooltip: false
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

  refToClipBoard = (ref: HTMLButtonElement|null) => {
    if (ref === null) { return }

    const client = new clipboard(ref)
    client.on('success', (_event: clipboard.Event) => { /* noop */ })
  }

  handleClick = () => {
    this.setState({ showTooltip: true }, () => {
      setTimeout(() => {
        this.setState({ showTooltip: false })
      }, 1600)
    })
  }
}
