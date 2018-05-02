import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { loadingBarMiddleware } from 'react-redux-loading-bar'

const composeEnhancers = composeWithDevTools({})

const rootStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(),
    applyMiddleware(
      loadingBarMiddleware()
    )
  )

  return store
}

export default rootStore
