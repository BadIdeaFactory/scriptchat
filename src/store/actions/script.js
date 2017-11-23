import { STORE_FOUNTAIN_RESULT } from '../actions'

export function storeFountainResult (result) {
  return {
    type: STORE_FOUNTAIN_RESULT,
    fountain: result
  }
}
