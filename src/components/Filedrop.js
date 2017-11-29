import React from 'react'
import { handleFiles } from '../scripts/file-handlers'
import './Filedrop.css'

class Filedrop extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false
    }
  }

  // Set up drag/drop file event listeners to the window`
  // Capturing events here prevents them from resulting in file navigation
  componentWillMount () {
    window.addEventListener('dragenter', this.onDragEnter, true)
    window.addEventListener('dragover', this.onDragOver, true)
    window.addEventListener('drop', this.handleDropOnWindow, true)
  }

  // This handler is added to the window during the componentWillMount step
  onDragEnter = (event) => {
    // Check to make sure that dropped items are files.
    // This prevents other drags (e.g. text in editor)
    // from turning on the file drop area.
    // See here: http://stackoverflow.com/questions/6848043/how-do-i-detect-a-file-is-being-dragged-rather-than-a-draggable-element-on-my-pa
    // Tested in Chrome, Firefox, Safari 8
    const types = event.dataTransfer.types
    if (types !== null &&
      types.indexOf ? (types.indexOf('Files') !== -1) : types.contains('application/x-moz-file')
    ) {
      event.preventDefault()
      // This absolutely needs to overwrite a parameter on the original event
      // eslint-disable-next-line no-param-reassign
      event.dataTransfer.dropEffect = 'copy'
      this.setState({ visible: true })
    }
  }

  // This handler is added to the drop area when it is rendered
  onDragOver = (event) => {
    // Required to prevent browser from navigating to a file
    // instead of receiving a data transfer
    event.preventDefault()

    // On Mac + Chrome, drag-and-dropping a scene file from the downloads bar
    // will silently fail. The drop event is never fired on the drop area.
    // This issue is tracked here: https://github.com/tangrams/tangram-play/issues/228
    // The Chrome bug is tracked here:
    // https://code.google.com/p/chromium/issues/detail?id=234931
    // Based on a comment in that thread, manually setting the dropEffect in this
    // way will solve this problem.
    const effect = event.dataTransfer && event.dataTransfer.dropEffect
    const effectAllowed = event.dataTransfer && event.dataTransfer.effectAllowed
    if (effect !== 'none' || effectAllowed === 'none') {
      return
    }
    // This absolutely needs to overwrite a parameter on the original event
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.dropEffect = 'copy'
  }

  onDragLeave = (event) => {
    event.preventDefault()
    this.setState({ visible: false })
  }

  onDrop = (event) => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({ visible: false })

    // React reuses synthetic events, so we capture the fileList
    // to a variable for use in the callback.
    const fileList = event.dataTransfer.files

    handleFiles(fileList)
  }

  // Required to prevent browser from navigating to a file
  // instead of receiving a data transfer
  handleDropOnWindow = (event) => {
    event.preventDefault()
  }

  render () {
    const displayStyle = this.state.visible
      ? { display: 'block' }
      : { display: 'none' }

    return (
      <div
        className="filedrop-container"
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        style={displayStyle}
      >
        <div className="filedrop-indicator">
          <div className="filedrop-label">Drop a file here to open</div>
        </div>
      </div>
    )
  }
}

export default Filedrop
