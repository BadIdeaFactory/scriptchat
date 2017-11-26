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
