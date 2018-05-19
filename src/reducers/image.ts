import { ImageActionNames as ActionNames } from '../constants/ActionTypes'

type SelectImageAction = { type: ActionNames.SELECT_IMAGE }
type Actions = SelectImageAction

export interface State {}

export default function random (state: State = {}, action: Actions) {
  switch (action.type) {
    case ActionNames.SELECT_IMAGE:
    default:
      return state
  }
}
