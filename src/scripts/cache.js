import localforage from 'localforage'

export function initBrowserCache () {
  // This must be set before ANY other calls to localforage.
  // https://localforage.github.io/localForage/#settings-api-config
  localforage.config({
    name: 'Scriptchat',
    storeName: 'scriptchat'
  })
}

export async function getCachedBrowserState () {
  const payload = {
    title: await localforage.getItem('title'),
    author: await localforage.getItem('author'),
    source: await localforage.getItem('source'),
    transcript: await localforage.getItem('transcript'),
    characters: await localforage.getItem('characters'),
  }

  return payload
}

export async function cacheBrowserState (key) {

}