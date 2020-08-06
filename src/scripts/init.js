import md5 from 'md5'
import { initBrowserCache, getCachedBrowserState } from './cache'
import store from '../store'
import { setScriptData, storeFountainResult } from '../store/slices/script'
import { setCharacterData } from '../store/slices/characters'
import { proofOfConceptScriptFormatting } from './parse-chat'

export async function initialize () {
  // Set up Localforage
  initBrowserCache()

  // Populate Redux store with browser cache if that information is present
  const { title, author, source, transcript, characters } = await getCachedBrowserState()

  store.dispatch(setScriptData({
    title, author, source, transcript
  }))
  store.dispatch(setCharacterData({
    characters
  }))

  const hash = md5(JSON.stringify(transcript))
  if (transcript) {
    const result = proofOfConceptScriptFormatting(transcript, { title, author, source, hash, characters })
    if (result) {
      store.dispatch(storeFountainResult(result))
    }
  }
}
