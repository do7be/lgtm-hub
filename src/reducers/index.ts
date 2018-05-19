import { combineReducers } from 'redux'
import socket from './socket'
import random from './random'
import history from './history'
import image from './image'

import { loadingBarReducer } from 'react-redux-loading-bar'

const rootReducer = combineReducers<RootState>({
  socket,
  random,
  history,
  image,
  loadingBar: loadingBarReducer
})

export default rootReducer

// TODO
export type RootState = {
  socket: any
  random: any
  history: any
  image: any
  loadingBar: any
}

export type ReduxAction = any
