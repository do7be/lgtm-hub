import React from 'react'
import { connect } from 'react-redux'

import Image from './Image'

import * as style from './RandomList.scss'

class RandomList extends React.Component {
  render () {
    return (
      <div className={style.imgArea}>
        {this.props.random.data.map(img => (
          <div
            key={img.url}
            className={style.textCenter}
          >
            <Image url={img.url} clip_board={img.clip_board}/>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return ({ random: store.random })
}

export default connect(mapStateToProps)(RandomList)
