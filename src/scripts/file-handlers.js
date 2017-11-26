import { isPlainObject } from 'lodash'
import fountain from './vendor/fountain'

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

export function handleFiles (fileList) {
  // fileList is not a true array so we have to call it separately
  return Promise.all(Array.prototype.map.call(fileList, readBlobAsText))
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
