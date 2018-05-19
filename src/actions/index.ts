import store from '../store'

import * as types from '../constants/ActionTypes'

export const loadRandom = () => {
  store().getState().socket.socket.emit('load random')
  return { type: types.RandomActionNames.LOAD_RANDOM }
}

export const setRandom = (data: string[]) => {
  return { type: types.RandomActionNames.SET_RANDOM, payload: data }
}

export const addHistory = (data: string) => {
  return { type: types.HistoryActionNames.ADD_HISTORY, payload: data }
}

export const loadHistory = () => {
  store().getState().socket.socket.emit('load recommend')
  return { type: types.HistoryActionNames.LOAD_HISTORY }
}

export const setHistory = (data: string) => {
  return { type: types.HistoryActionNames.SET_HISTORY, payload: data }
}

export const selectImage = (data: { img: string }) => {
  store().getState().socket.socket.emit('select image', data)

  return { type: types.ImageActionNames.SELECT_IMAGE }
}
