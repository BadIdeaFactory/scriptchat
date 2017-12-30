import { STORE_CHARACTERS } from '../actions'

const initialState = {
  characters: {}
}

const characters = (state = initialState, action) => {
  switch (action.type) {
    case STORE_CHARACTERS:
      return {
        ...state,
        characters: action.characters
      }
    default:
      return state
  }
}

export default characters
