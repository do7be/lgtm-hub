import { Dispatch } from 'redux'
import { RootState } from '../reducers'
import * as types from '../constants/ActionTypes'

export const loadRandom = () => {
  return async function (dispatch: Dispatch<RootState>, _getState: any) {
    const data: { imageUrl: string }[] = await (await fetch('/random')).json()
    const imageData = data.map(image => image.imageUrl)
    return dispatch({ type: types.RandomActionNames.LOAD_RANDOM, payload: imageData })
  }
}

export const addHistory = (data: string) => {
  return { type: types.HistoryActionNames.ADD_HISTORY, payload: data }
}

export const loadHistory = () => {
  return async function (dispatch: Dispatch<RootState>, _getState: any) {
    const data: ReadonlyArray<string> = await (await fetch('/recommend')).json()
    return dispatch({ type: types.HistoryActionNames.LOAD_HISTORY, payload: data })
  }
}

export const selectImage = (data: { img: string }) => {
  return async function (dispatch: Dispatch<RootState>, _getState: any) {
    const method = 'POST'
    const body = JSON.stringify(data)
    const headers = {
      'Content-Type': 'application/json'
    }
    const options = { method, headers, body }
    await fetch('/select', options)

    return dispatch({ type: types.ImageActionNames.SELECT_IMAGE })
  }
}
