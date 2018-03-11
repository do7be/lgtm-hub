import { SOCKET } from '../constants/ActionTypes'

const socket = io()
const initialState = { socket }

export default function random (state = initialState, action) {
  switch (action.type) {
    case SOCKET:
      return { socket }
    default:
      return state
  }
}
