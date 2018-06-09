import { createStore, applyMiddleware } from 'redux'
import rootReducer, { RootState } from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import thunk from 'redux-thunk'

const composeEnhancers = composeWithDevTools({})

const rootStore = () => {
  const store = createStore<RootState>(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        loadingBarMiddleware(),
        thunk
      )
    )
  )

  return store
}

export default rootStore
