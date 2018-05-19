import { combineReducers } from 'redux'
import socket, { State as SocketState } from './socket'
import random, { State as RandomState } from './random'
import history, { State as HistoryState } from './history'
import image, { State as ImageState } from './image'

import { loadingBarReducer } from 'react-redux-loading-bar'

const rootReducer = combineReducers<RootState>({
  socket,
  random,
  history,
  image,
  loadingBar: loadingBarReducer
})

export default rootReducer

export type RootState = {
  socket: SocketState
  random: RandomState
  history: HistoryState
  image: ImageState
}

export type ReduxAction = any
