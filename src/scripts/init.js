import { initBrowserCache, getCachedBrowserState } from './cache'
import store from '../store'
import { setTitle, setAuthor, setSource, storeRawTranscript } from '../store/slices/script'
import { storeCharacterData } from '../store/slices/characters'

export async function initialize () {
  // Set up Localforage
  initBrowserCache()

  // Populate Redux store with browser cache if that information is present
  const { title, author, source, transcript, characters } = await getCachedBrowserState()

  if (title) {
    store.dispatch(setTitle(title))
  }
  if (author) {
    store.dispatch(setAuthor(author))
  }
  if (source) {
    store.dispatch(setSource(source))
  }
  if (transcript) {
    store.dispatch(storeRawTranscript(transcript))
  }
  if (characters) {
    store.dispatch(storeCharacterData(characters))
  }
}
