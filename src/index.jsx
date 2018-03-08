import qs from 'qs'
import React from 'react'
import ReactDOM from 'react-dom'

import { RandomList, RecommendList, ReloadButton } from './components/index.jsx'

import 'react-tippy/dist/tippy.css'

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
      <section className='window'>
        <section className='container'>
          <section className='contents'>
            <div className='tweet_button'>
              <a
                className='twitter-share-button'
                target='_blank'
                href={`https://twitter.com/intent/tweet?${qs.stringify({
                  text: `LGTM-HUB ${location.href}`
                })}`}
              >
                Tweet
              </a>
            </div>
            <div className='clear_both'></div>
            <div className='text-center'>
              <h1 className='title'>LGTM-HUB</h1>
              <p>
                Copy your clipboard in the form of markdown.
                <span className='explain'>![LGTM](http://***)</span>
              </p>
              <ReloadButton handleClickReload={this.reloadRandomImages}/>
              <RandomList data={randomImages} handleClickCopy={this.handleClickCopy}/>
              <RecommendList data={recommendImages} handleClickCopy={this.handleClickCopy}/>

            </div>
            <section className='lgtm_site_text'>
              <p>
                get images by <a href='http://www.lgtm.in/'>http://www.lgtm.in/</a>
              </p>
            </section>
          </section>
        </section>
      </section>
    )
  }

  reloadRandomImages () {
    this.socket.emit('load random')
  }

  handleClickCopy (url) {
    this.socket.emit('select image', { img: url })
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
