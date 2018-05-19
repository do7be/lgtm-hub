import React from 'react'
import { connect } from 'react-redux'

import { loadRandom, setRandom } from '../actions'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { Tooltip } from 'react-tippy'

import { RootState } from '../reducers'
import { State as RandomState } from '../reducers/random'
import { State as SocketState } from '../reducers/socket'

import ReloadSvg from './reload.svg'

import * as style from './ReloadButton.scss'

interface OwnProps {}

interface ReduxProps {
  random: RandomState
  socket: SocketState
}

type Props = OwnProps & ReduxProps & typeof mapDispatchToProps

interface State {
  busy: boolean
  openTooltip: boolean
}

class ReloadButton extends React.Component<Props, State> {
  readonly state: Readonly<State> = {
    busy: false,
    openTooltip: false
  }

  componentDidMount () {
    this.handleReload()
    this.props.socket.socket.on('loaded random', (data: { imageUrl: string }[]) => {
      const imageData = data.map(image => image.imageUrl)
      this.props.setRandom(imageData)
      this.props.hideLoading()
    })
  }

  componentDidUpdate (newProps: Props) {
    if (this.props !== newProps) {
      this.setState({ busy: false, openTooltip: false })
    }
  }

  render () {
    return (
      <div className={style.container}>
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
            className={style.reloadButton}
            onClick={this.onClickReload}
            disabled={this.state.busy}
          >
            <ReloadSvg width={72} height={72}/>
          </button>
        </Tooltip>
      </div>
    )
  }

  onClickReload = () => {
    this.setState({ busy: true, openTooltip: true }, () => {
      this.handleReload()
    })
  }

  handleReload = () => {
    this.props.loadRandom()
    this.props.showLoading()
  }
}

const mapStateToProps = (store: RootState) => {
  return ({ random: store.random, socket: store.socket })
}

const mapDispatchToProps = {
  loadRandom,
  setRandom,
  showLoading,
  hideLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(ReloadButton)
