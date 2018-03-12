import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadRandom, setRandom } from '../actions'

import { Tooltip } from 'react-tippy'

import * as style from './ReloadButton.scss'

class ReloadButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = { busy: false, openTooltip: false }
    this.saveRef = this.saveRef.bind(this)
    this.onClickReload = this.onClickReload.bind(this)
    this.handleReload = this.handleReload.bind(this)
  }

  componentDidMount () {
    this.handleReload()
    this.props.socket.socket.on('loaded random', (data) => {
      const imageData = data.map(image => ({
        url: image.imageUrl,
        clip_board: `![LGTM](${image.imageUrl})`
      }))
      this.props.actions.setRandom(imageData)
    })
  }

  componentDidUpdate (newProps) {
    if (this.props !== newProps) {
      this.setState({ busy: false, openTooltip: false })
    }
  }

  render () {
    return (
      <section className={classNames(style.reloadArea, style.textCenter)}>
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
            className={classNames('btn btn-primary btn-large', style.reloadButton)}
            onClick={this.onClickReload}
            ref={this.saveRef}
            disabled={this.state.busy}
          >
            Reload
          </button>
        </Tooltip>
      </section>
    )
  }

  onClickReload () {
    this.setState({ busy: true, openTooltip: true }, () => {
      this.handleReload()
    })
  }

  handleReload () {
    this.props.actions.loadRandom()
  }

  saveRef (ref) {
    this.ref = ref
  }
}

const mapStateToProps = (store) => {
  return ({ random: store.random, socket: store.socket })
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ loadRandom, setRandom }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReloadButton)
