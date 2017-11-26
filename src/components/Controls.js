import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Input from './ui/Input'
import { setTitle, setAuthor } from '../store/actions/script'
import './Controls.css'

class Controls extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    author: PropTypes.string
  }

  render () {
    return (
      <div className="controls">
        <h1>Scriptchat</h1>
        <div className="properties">
          <Input label="Title" value={this.props.title} onChange={this.props.setTitle} />
          <Input label="Author" value={this.props.author} onChange={this.props.setAuthor} />
        </div>
        <button onClick={this.onClickOpenFileButton}>Open script file</button>
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
