import { HISTORY, SET_HISTORY, ADD_HISTORY } from '../constants/ActionTypes'

const initialState = { data: [] }

export default function random (state = initialState, action) {
  switch (action.type) {
    case HISTORY:
      return { data: state.data }
    case SET_HISTORY:
      return { data: action.payload.reverse() }
    case ADD_HISTORY:
      const recommendData = [].concat(state.data)
      recommendData.unshift(action.payload)

      return {
        data: recommendData.slice(0, 24)
      }
    default:
      return state
  }
}
