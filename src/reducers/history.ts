import { HistoryActionNames as ActionNames } from '../constants/ActionTypes'

interface State {
  data: string[]
}

type GetHistoryAction = { type: ActionNames.HISTORY }
type SetHistoryAction = { type: ActionNames.SET_HISTORY, payload: string[] }
type AddHistoryAction = { type: ActionNames.ADD_HISTORY, payload: string }
type Actions = GetHistoryAction|SetHistoryAction|AddHistoryAction

export default function random (state: State = { data: [] }, action: Actions) {
  switch (action.type) {
    case ActionNames.HISTORY:
      return { data: state.data }
    case ActionNames.SET_HISTORY:
      return { data: action.payload.reverse() }
    case ActionNames.ADD_HISTORY:
      const recommendData = Array.from(state.data)
      recommendData.unshift(action.payload)

      return {
        data: recommendData.slice(0, 24)
      }
    default:
      return state
  }
}
