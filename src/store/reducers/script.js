import { SET_TITLE, SET_AUTHOR, STORE_FOUNTAIN_RESULT } from '../actions'

const initialState = {
  title: null,
  author: null,
  fountain: null
}

const script = (state = initialState, action) => {
  switch (action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: action.title
      }
    case SET_AUTHOR:
      return {
        ...state,
        author: action.author
      }
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
