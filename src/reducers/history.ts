import { HistoryActionNames as ActionNames } from '../constants/ActionTypes'

export interface State {
  data: string[]
}

type GetHistoryAction = { type: ActionNames.HISTORY }
type LoadHistoryAction = { type: ActionNames.LOAD_HISTORY, payload: string[] }
type AddHistoryAction = { type: ActionNames.ADD_HISTORY, payload: string }
type Actions = GetHistoryAction|LoadHistoryAction|AddHistoryAction

export default function random (state: State = { data: [] }, action: Actions) {
  switch (action.type) {
    case ActionNames.HISTORY:
      return { data: state.data }
    case ActionNames.LOAD_HISTORY:
      return { data: action.payload.reverse() }
    case ActionNames.ADD_HISTORY:
      const recommendData = state.data
      if (!recommendData.includes(action.payload)) {
        recommendData.unshift(action.payload)
      }

      return {
        data: recommendData.slice(0, 24)
      }
    default:
      return state
  }
}
