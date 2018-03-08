import React from 'react'
import ReactDOM from 'react-dom'

import { RandomList, RecommendList, ReloadButton } from './components/index.jsx'

$(function() {
  ReactDOM.render(<App/>, document.getElementById('app'))
})

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      randomImages: [],
      recommendImages: []
    }
    this.socket = io()
    this.reloadRandomImages = this.reloadRandomImages.bind(this)
    this.handleClickCopy = this.handleClickCopy.bind(this)
  }

  componentDidMount () {
    // initialize tooltip
    $('button').tooltip('destroy');

    this.reloadRandomImages()

    this.socket.on('load recommend', (data) => {
      this.setState({ recommendImages: data })
    })

    // load recommend images to display bottom at other people copy
    this.socket.on('add recommend', (data) => {
      this.setState((prevState) => {
        const recommendData = [].concat(prevState.recommendImages)
        recommendData.push(data)

        return { recommendImages: recommendData.slice(-10) }
      })
    })

    // loaded random images to init or click reload button
    this.socket.on('loaded random', (data) => {
      const imageData = data.map(obj => ({
        url: obj.imageUrl,
        clip_board: `![LGTM](${obj.imageUrl})`
      }))

      this.setState({ randomImages: imageData })
    })
  }

  render () {
    const { randomImages, recommendImages } = this.state
    return (
      <div>
        <ReloadButton handleClickReload={this.reloadRandomImages}/>
        <RandomList data={randomImages} handleClickCopy={this.handleClickCopy}/>
        <RecommendList data={recommendImages} handleClickCopy={this.handleClickCopy}/>
      </div>
    )
  }

  reloadRandomImages () {
    this.socket.emit('load random')
  }

  handleClickCopy (url) {
    this.socket.emit('select image', { img: url })
  }
}
