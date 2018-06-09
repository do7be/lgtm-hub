import React from 'react'
import { connect } from 'react-redux'

import { loadRandom } from '../actions'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { Tooltip } from 'react-tippy'

import { RootState } from '../reducers'
import { State as RandomState } from '../reducers/random'

import ReloadSvg from './reload.svg'

import * as style from './ReloadButton.scss'

interface OwnProps {}

interface ReduxProps {
  random: RandomState
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

  handleReload = async () => {
    this.props.showLoading()
    await this.props.loadRandom()
    this.props.hideLoading()
  }
}

const mapStateToProps = (store: RootState) => {
  return ({ random: store.random })
}

const mapDispatchToProps = {
  loadRandom,
  showLoading,
  hideLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(ReloadButton)
