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
            key={img}
            className={style.textCenter}
          >
            <Image url={img}/>
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
