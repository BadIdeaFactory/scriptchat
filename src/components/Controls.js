import React from 'react'
import Filedrop from './Filedrop'
import './Controls.css'

export default class Controls extends React.Component {
  render () {
    return (
      <div className="controls">
        <h1>Scriptchat</h1>
        <div className="properties">
          <input
            type="text"
            name="title"
            className="input-with-label"
            id="title"
            required
            autocomplete="off"
          />
          <label for="title"><span>Title</span></label>

          <input
            type="text"
            name="author"
            className="input-with-label"
            id="author"
            required
            autocomplete="off"
          />
          <label for="author"><span>Author</span></label>
        </div>
        <Filedrop />
      </div>
    )
  }
}
