import { createStore } from 'redux'
import rootReducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

const composeEnhancers = composeWithDevTools({})

const rootStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers()
  )

  return store
}

export default rootStore
