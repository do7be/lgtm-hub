import { RANDOM, SET_RANDOM } from '../constants/ActionTypes'

const initialState = { data: [] }

export default function random (state = initialState, action) {
  switch (action.type) {
    case RANDOM:
      return { data: state.data }
    case SET_RANDOM:
      return { data: action.payload }
    default:
      return state
  }
}
