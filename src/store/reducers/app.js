import { SET_TITLE } from '../actions'

const initialState = {
  title: ''
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: action.title
      }
    default:
      return state
  }
}

export default app
