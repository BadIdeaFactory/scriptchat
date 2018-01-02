import { SET_TITLE, SET_AUTHOR, STORE_RAW_TRANSCRIPT, STORE_FOUNTAIN_RESULT } from '../actions'

export function storeRawTranscript (transcript) {
  return {
    type: STORE_RAW_TRANSCRIPT,
    transcript
  }
}

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
