import { createStore } from 'redux'
import rootReducer from '../reducers'

const rootStore = () => {
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  return store
}

export default rootStore
