import React from 'react'
import { connect } from 'react-redux'

import { addHistory, loadHistory } from '../actions'

import { RootState } from '../reducers'
import { State as HistoryState } from '../reducers/history'

import Image from './Image'

import * as style from './HistoryList.scss'

interface OwnProps {}

interface ReduxProps {
  history: HistoryState
}

type Props = OwnProps & ReduxProps & typeof mapDispatchToProps

export class HistoryList extends React.Component<Props> {
  componentDidMount () {
    this.props.loadHistory()
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
  return ({ history: store.history })
}

const mapDispatchToProps = {
  addHistory,
  loadHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryList)
