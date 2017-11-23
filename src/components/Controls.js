import React from 'react'
import Filedrop from './Filedrop'
import './Controls.css'

export default class Controls extends React.Component {
  render () {
    return (
      <div className="controls">
        <h1>Scriptchat</h1>
        <Filedrop />
      </div>
    )
  }
}
