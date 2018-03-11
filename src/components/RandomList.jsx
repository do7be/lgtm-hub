import React from 'react'
import Image from './Image'

// Random LGTM Images
class RandomList extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='img_area'>
        {this.props.data.map(img => (
          <div
            key={img.url}
            className='text-center'
          >
            <Image url={img.url} clip_board={img.clip_board} handleClickCopy={this.props.handleClickCopy}/>
          </div>
        ))}
      </div>
    )
  }
}

RandomList.defaultProps = {
  data: []
}

export default RandomList
