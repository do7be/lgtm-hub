import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadRandom, setRandom } from '../actions'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { Tooltip } from 'react-tippy'

import ReloadSvg from './reload.svg'

import * as style from './ReloadButton.scss'

class ReloadButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = { busy: false, openTooltip: false }
  }

  componentDidMount () {
    this.handleReload()
    this.props.socket.socket.on('loaded random', (data) => {
      const imageData = data.map(image => image.imageUrl)
      this.props.actions.setRandom(imageData)
      this.props.actions.hideLoading()
    })
  }

  componentDidUpdate (newProps) {
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
            ref={this.saveRef}
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
    this.props.actions.loadRandom()
    this.props.actions.showLoading()
  }

  saveRef = (ref) => {
    this.ref = ref
  }
}

const mapStateToProps = (store) => {
  return ({ random: store.random, socket: store.socket })
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ loadRandom, setRandom, showLoading, hideLoading }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReloadButton)
