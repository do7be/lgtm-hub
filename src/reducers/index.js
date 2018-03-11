import { combineReducers } from 'redux'
import socket from './socket'
import random from './random'
import history from './history'
import image from './image'

const rootReducer = combineReducers({
  socket,
  random,
  history,
  image
})

export default rootReducer
