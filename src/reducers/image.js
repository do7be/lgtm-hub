import { SELECT_IMAGE } from '../constants/ActionTypes'

const initialState = {}

export default function random (state = initialState, action) {
  switch (action.type) {
    case SELECT_IMAGE:
    default:
      return state
  }
}
