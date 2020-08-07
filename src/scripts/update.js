import { proofOfConceptScriptFormatting } from './parse-chat'
import { storeFountainResult } from '../store/slices/script'

export function updateFountain (newData, getState, dispatch) {
  const { author, title, source, transcript, hash } = getState().script
  const { characters } = getState().characters
  const existingData = { title, author, source, hash, transcript, characters }
  const data = {
    ...existingData,
    ...newData
  }

  if (data.transcript) {
    const result = proofOfConceptScriptFormatting(data.transcript, data)
    if (result) {
      dispatch(storeFountainResult(result))
    }
  }
}
