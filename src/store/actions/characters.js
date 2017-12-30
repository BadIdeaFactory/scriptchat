import { STORE_CHARACTERS } from '../actions'

export function storeCharacterData (characters) {
  return {
    type: STORE_CHARACTERS,
    characters
  }
}
