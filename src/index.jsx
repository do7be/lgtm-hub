import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'

import 'react-tippy/dist/tippy.css'

import rootStore from './store'
const store = rootStore()

class App extends React.Component {
  render () {
    return (
      <>
        <Header/>
        <Main/>
        <Footer/>
      </>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)
