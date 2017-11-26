import React from 'react'
import Filedrop from './Filedrop'
import Input from './ui/Input'
import './Controls.css'

export default class Controls extends React.Component {
  render () {
    return (
      <div className="controls">
        <h1>Scriptchat</h1>
        <div className="properties">
          <Input label="Title" value="default" />
          <Input label="Author" />
        </div>
        <Filedrop />
      </div>
    )
  }
}
