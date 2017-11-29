import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Input from './ui/Input'
import { openLocalFile } from '../scripts/file-input'
import { handleFiles } from '../scripts/file-handlers'
import { setTitle, setAuthor } from '../store/actions/script'
import './Controls.css'

class Controls extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    author: PropTypes.string
  }

  onClickOpenFileButton = (event) => {
    openLocalFile()
      .then((event) => {
        handleFiles(event.target.files)
      })
  }

  render () {
    return (
      <div className="controls">
        <h1>Scriptchat</h1>
        <div className="properties">
          <Input label="Title" value={this.props.title} onChange={this.props.setTitle} />
          <Input label="Author" value={this.props.author} onChange={this.props.setAuthor} />
        </div>
        <button className="button" onClick={this.onClickOpenFileButton}>Add a file</button>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    title: state.script.title || '',
    author: state.script.author || ''
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ setTitle, setAuthor }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
