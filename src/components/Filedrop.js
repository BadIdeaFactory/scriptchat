import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { scriptParser } from '../scripts/file-handlers'
import { storeFountainResult } from '../store/actions/script'
import './Filedrop.css'

class Filedrop extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      active: false
    }
  }

  onDragOver = (event) => {
    // Check to make sure that dropped items are files.
    // This prevents other drags (e.g. text in editor)
    // from turning on the file drop area.
    // See here: http://stackoverflow.com/questions/6848043/how-do-i-detect-a-file-is-being-dragged-rather-than-a-draggable-element-on-my-pa
    // Tested in Chrome, Firefox, Safari 8
    const types = event.dataTransfer.types
    if (types !== null &&
      types.indexOf ? (types.indexOf('Files') !== -1) : types.contains('application/x-moz-file')
    ) {
      // Required to prevent browser from navigating to a file
      // instead of receiving a data transfer
      event.preventDefault()

      this.setState({ active: true })
    }
  }

  onDragLeave = (event) => {
    this.setState({ active: false })
  }

  onDrop = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const file = event.dataTransfer.files[0]

    if (file) {
      const reader = new window.FileReader()

      reader.onload = (e) => {
        scriptParser(e.target.result)
          .then(this.props.storeFountainResult)
      }

      reader.readAsText(file)
    }

    this.setState({ active: false })
  }

  render () {
    let className = "filedrop"
    if (this.state.active === true) {
      className += " filedrop-active"
    }

    return (
      <div
        className={className}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
      >
        <button onClick={this.onClickOpenFileButton}>Open script file</button>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ storeFountainResult }, dispatch)
}

export default connect(null, mapDispatchToProps)(Filedrop)
