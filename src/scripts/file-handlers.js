import fountain from './vendor/fountain'

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
