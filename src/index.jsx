import classNames from 'classnames'
import qs from 'qs'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import HistoryList from './components/HistoryList'
import RandomList from './components/RandomList'
import ReloadButton from './components/ReloadButton'

import * as style from './style.scss'

import rootStore from './store'
const store = rootStore()

import 'react-tippy/dist/tippy.css'

class App extends React.Component {
  render () {
    return (
      <section className={style.window}>
        <section className={style.container}>
          <section className={style.contents}>
            <div className={style.tweetButton}>
              <a
                className={style.twitterShareButton}
                target='_blank'
                href={`https://twitter.com/intent/tweet?${qs.stringify({
                  text: `LGTM-HUB ${location.href}`
                })}`}
              >
                Tweet
              </a>
            </div>
            <div className={style.clearBoth}></div>
            <div className={style.textCenter}>
              <h1 className={style.title}>LGTM-HUB</h1>
              <p>
                Copy your clipboard in the form of markdown.
                <span className={style.explain}>![LGTM](http://***)</span>
              </p>
              <ReloadButton/>
              <RandomList/>
              <HistoryList/>
            </div>
            <section className={style.lgtmSiteText}>
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
