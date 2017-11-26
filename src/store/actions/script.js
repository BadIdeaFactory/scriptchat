import { SET_TITLE, SET_AUTHOR, STORE_FOUNTAIN_RESULT } from '../actions'

export function storeFountainResult (result) {
  return {
    type: STORE_FOUNTAIN_RESULT,
    fountain: result
  }
}

export function setTitle (title) {
  return {
    type: SET_TITLE,
    title
  }
}

export function setAuthor (author) {
  return {
    type: SET_AUTHOR,
    author
  }
}
