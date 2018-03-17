import React from 'react'
import { connect } from 'react-redux'

import ReloadButton from './ReloadButton'
import Image from './Image'

import * as style from './RandomList.scss'

class RandomList extends React.Component {
  render () {
    return (
      <div className={style.container}>
        {this.props.random.data.map(img => (
          <div
            key={img.url}
            className={style.item}
          >
            <Image url={img.url} clip_board={img.clip_board}/>
          </div>
        ))}
        <div className={style.item}>
          <ReloadButton/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return ({ random: store.random })
}

export default connect(mapStateToProps)(RandomList)
