import store from '../store'

import * as types from '../constants/ActionTypes'

export const loadRandom = () => {
  store().getState().socket.socket.emit('load random')
  return { type: types.LOAD_RANDOM }
}

export const setRandom = (data) => {
  return { type: types.SET_RANDOM, payload: data }
}

export const addHistory = (data) => {
  return { type: types.ADD_HISTORY, payload: data }
}

export const loadHistory = () => {
  store().getState().socket.socket.emit('load recommend')
  return { type: types.LOAD_HISTORY }
}

export const setHistory = (data) => {
  return { type: types.SET_HISTORY, payload: data }
}

export const selectImage = (data) => {
  store().getState().socket.socket.emit('select image', data)

  return { type: types.SELECT_IMAGE }
}
