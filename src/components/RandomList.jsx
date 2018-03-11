import React from 'react'
import { connect } from 'react-redux'

import Image from './Image'

// Random LGTM Images
class RandomList extends React.Component {
  render () {
    return (
      <div className='img_area'>
        {this.props.random.data.map(img => (
          <div
            key={img.url}
            className='text-center'
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
