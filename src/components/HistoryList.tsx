import React from 'react'
import { connect } from 'react-redux'

import { addHistory, loadHistory, setHistory } from '../actions'

import { RootState } from '../reducers'
import { State as HistoryState } from '../reducers/history'
import { State as SocketState } from '../reducers/socket'

import Image from './Image'

import * as style from './HistoryList.scss'

interface OwnProps {}

interface ReduxProps {
  history: HistoryState
  socket: SocketState
}

type Props = OwnProps & ReduxProps & typeof mapDispatchToProps

export class HistoryList extends React.Component<Props> {
  componentDidMount () {
    this.props.loadHistory()

    this.props.socket.socket.on('add recommend', (data: string) => {
      this.props.addHistory(data)
    })

    this.props.socket.socket.on('load recommend', (data: string) => {
      this.props.setHistory(data)
    })
  }

  render () {
    return (
      <div className={style.historyContainer}>
        <h2 className={style.label}>HISTORY</h2>
        <ul className={style.gridContainer}>
          {this.props.history.data.map(img => (
            <li key={img} className={style.item}>
              <Image url={img} small/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (store: RootState) => {
  return ({ history: store.history, socket: store.socket })
}

const mapDispatchToProps = {
  addHistory,
  loadHistory,
  setHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryList)
