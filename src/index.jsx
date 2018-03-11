import qs from 'qs'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import HistoryList from './components/HistoryList'
import RandomList from './components/RandomList'
import ReloadButton from './components/ReloadButton'

import rootStore from './store'
const store = rootStore()

import 'react-tippy/dist/tippy.css'

class App extends React.Component {
  render () {
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
              <ReloadButton/>
              <RandomList/>
              <HistoryList/>

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
}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)
