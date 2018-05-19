import { SocketActionNames as ActionNames } from '../constants/ActionTypes'

const socket = io()

type GetSocketAction = { type: ActionNames.SOCKET }
type Actions = GetSocketAction

export interface State {
  socket: any
}

export default function random (state: State = { socket }, action: Actions) {
  switch (action.type) {
    case ActionNames.SOCKET:
      return { socket }
    default:
      return state
  }
}
