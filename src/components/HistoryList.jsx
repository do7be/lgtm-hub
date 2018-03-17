import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addHistory, loadHistory, setHistory } from '../actions'

import Image from './Image'

import * as style from './HistoryList.scss'

export class HistoryList extends React.Component {
  componentDidMount () {
    this.props.actions.loadHistory()

    this.props.socket.socket.on('add recommend', (data) => {
      this.props.actions.addHistory(data)
    })

    this.props.socket.socket.on('load recommend', (data) => {
      this.props.actions.setHistory(data)
    })
  }

  render () {
    return (
      <div className={style.historyContainer}>
        <h2 className={style.label}>HISTORY</h2>
        <ul className={style.gridContainer}>
          {this.props.history.data.map(img => (
            <li key={img.url} className={style.item}>
              <Image url={img.url} clip_board={img.clip_board} small/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return ({ history: store.history, socket: store.socket })
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ addHistory, loadHistory, setHistory }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryList)
