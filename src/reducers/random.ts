import { RandomActionNames as ActionNames } from '../constants/ActionTypes'

interface State {
  data: string[]
}

type GetRandomAction = { type: ActionNames.RANDOM }
type SetRandomAction = { type: ActionNames.SET_RANDOM, payload: string[] }
type Actions = GetRandomAction|SetRandomAction


export default function random (state: State = { data: [] }, action: Actions) {
  switch (action.type) {
    case ActionNames.RANDOM:
      return { data: state.data }
    case ActionNames.SET_RANDOM:
      return { data: action.payload }
    default:
      return state
  }
}
