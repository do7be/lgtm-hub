import React from 'react'
import { connect } from 'react-redux'

import ReloadButton from './ReloadButton'
import Image from './Image'

import { RootState } from '../reducers'

import * as style from './RandomList.scss'

interface Props {
  random: {
    data: string[]
  }
}

class RandomList extends React.Component<Props> {
  render () {
    return (
      <div className={style.container}>
        {this.props.random.data.map(img => (
          <div
            key={img}
            className={style.item}
          >
            <Image url={img}/>
          </div>
        ))}
        <div className={style.item}>
          <ReloadButton/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store: RootState) => {
  return ({ random: store.random })
}

export default connect(mapStateToProps)(RandomList)
