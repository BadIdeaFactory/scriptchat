/**
 * Creates an "open from filesystem" dialog box using the browser.
 *
 * JavaScript does not have access to the host system's filesystem.
 * We must go through the browser. The way this works is by constructing
 * an invisible file input element in memory, and then triggering a click
 * on it, which activates the browser's open dialog.
 */
function constructInvisibleFileInputElement () {
  const fileSelector = document.createElement('input')
  fileSelector.setAttribute('type', 'file')
  fileSelector.setAttribute('accept', '.txt,.json')
  fileSelector.style.display = 'none'
  return fileSelector
}

/**
 * @returns {Promise}
 */
export function openLocalFile () {
  return new Promise((resolve, reject) => {
    const el = constructInvisibleFileInputElement()

    el.addEventListener('change', (event) => {
      resolve(event)
    })

    el.click()
  })
}
