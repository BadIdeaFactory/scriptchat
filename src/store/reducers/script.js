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
    case STORE_FOUNTAIN_RESULT: {
      let author
      for (let i = 0; i < action.fountain.tokens.length; i++) {
        if (action.fountain.tokens[i].type === 'author') {
          author = action.fountain.tokens[i].text
        }
      }

      return {
        ...state,
        fountain: action.fountain,
        title: action.fountain.title,
        author
      }
    }
    default:
      return state
  }
}

export default script
