import React from 'react'
import Controls from './Controls'
import Script from './Script'
import './App.css'

class App extends React.Component {
  render () {
    return (
      <div className="workspace">
        <div className="control-pane">
          <Controls />
        </div>
        <div className="script-pane">
          <Script />
        </div>
      </div>
    )
  }
}

export default App
