import { STORE_FOUNTAIN_RESULT } from '../actions'

const initialState = {
  fountain: null
}

const script = (state = initialState, action) => {
  switch (action.type) {
    case STORE_FOUNTAIN_RESULT:
      return {
        ...state,
        fountain: action.fountain
      }
    default:
      return state
  }
}

export default script
