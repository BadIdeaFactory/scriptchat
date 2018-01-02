import { isPlainObject } from 'lodash'
import fountain from './vendor/fountain'
import { proofOfConceptScriptFormatting } from './parse-chat'
import { storeRawTranscript, storeFountainResult } from '../store/actions/script'
import { storeCharacterData } from '../store/actions/characters'
import store from '../store'

/**
 * Wraps FileReader.readAsText() in a Promise
 *
 * @param {Blob|File} blob - the Blob or File from which to read. This argument
 *          is passed as the first argument to FileReader.readAsText().
 * @return {Promise} - resolved with content of Blob or File, or a Promise
 *          rejection with error message.
 */
export function readBlobAsText (blob) {
  return new Promise((resolve, reject) => {
    // Rejects the Promise immediately if the `file` argument is not
    // a Blob or File object
    if (!(blob instanceof Blob || blob instanceof File)) {
      reject(new Error('Unable to load your file: it is not a valid file type.'))
      return
    }

    const reader = new FileReader()

    // Resolves when FileReader is completely done loading. The `load` event
    // can fire before the end of a file is encountered so we listen for
    // loadend` instead. The Promise resolves with the value of the file
    // contents but also loads into the editor.
    reader.addEventListener('loadend', (event) => {
      resolve(event.target.result)
    })

    // If FileReader encounters an error, the Promise is rejected with
    // the value of the error property on the FileReader object.
    reader.addEventListener('error', (event) => {
      reject(reader.error)
    })

    reader.readAsText(blob)
  })
}

/**
 * 
 * @param {Object} transcript - parsed JSON of raw Slack transcript file
 */
function renderScript (transcript) {
  const result = proofOfConceptScriptFormatting(transcript)
  store.dispatch(storeFountainResult(result))
}

export function handleFiles (fileList) {
  // fileList is not a true array so we have to call it separately
  return Promise.all(Array.prototype.map.call(fileList, readBlobAsText))
    .then((files) => {
      files.forEach(file => {
        // try parsing as JSON first, if it's not parseable as JSON,
        // send it to Fountain - note: this will only show the last Fountain file
        // per dropped set of files but that's okay, since it really shouldn't
        // happen frequently in the long run, this is just for testing.
        try {
          const json = JSON.parse(file)
          const format = whatIsThisJSON(json)
          // parse chat
          if (format === 'chat') {
            store.dispatch(storeRawTranscript(json))
            renderScript(json)
          } else if (format === 'users') {
            // get user data so that chat is better
            const characters = parseUserData(json)
            store.dispatch(storeCharacterData(characters))
            const transcript = store.getState().script.transcript
            if (transcript) {
              renderScript(transcript)
            }
          }
        } catch (err) {
          console.log(err)
          scriptParser(file)
            .then((result) => {
              store.dispatch(storeFountainResult(result))
            })
        }
      })
    })
}

// Wraps Fountain.js's async functionality inside a Promise
export function scriptParser (file) {
  return new Promise(function (resolve, reject) {
    try {
      fountain.parse(file, true, function (result) {
        if (result) {
          resolve(result)
        } else {
          resolve(null)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Determines if a JSON parsed object is Slack chat log, users list, or neither.
 * If neither, returns a falsy value.
 *
 * @param {Object} - parsed JS object from JSON
 * @returns {string|null} - string representing what it is, or null if unknown type
 */
export function whatIsThisJSON (json) {
  if (isJSONFromSlackChat(json)) return 'chat'
  else if (isJSONFromSlackUsers(json)) return 'users'
  else return null
}

function isJSONFromSlackChat (json) {
  let proof = 0
  // array of objects containing property "type: 'message'"
  if (Array.isArray(json)) proof++
  if (json.length > 0) proof++
  if (isPlainObject(json[0]) === true) proof++
  if (json[0].hasOwnProperty('type') && json[0].type === 'message') proof++

  return (proof >= 4)
}

function isJSONFromSlackUsers (json) {
  let proof = 0
  // array of objects containing properties "id", "name", and "profile"
  // must differentiate between users.json and channels.json
  if (Array.isArray(json)) proof++
  if (json.length > 0) proof++
  if (isPlainObject(json[0]) === true) proof++
  if (json[0].hasOwnProperty('id')) proof++
  if (json[0].hasOwnProperty('name')) proof++
  if (json[0].hasOwnProperty('profile')) proof++

  return (proof >= 6)
}

function parseUserData (json) {
  return json.reduce((obj, user) => {
    obj[user.id] = {
      id: user.id,
      firstName: user.profile.first_name || null
    }
    return obj
  }, {})
}
