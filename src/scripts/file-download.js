// Temporarily create an element and click to download
export function downloadTextFile (filename, contents) {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contents))
  element.setAttribute('download', filename)
  element.style.display = 'none'

  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
