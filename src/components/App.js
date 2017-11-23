import React from 'react'
import { Provider } from 'react-redux'
import Controls from './Controls'
import Script from './Script'
import store from '../store'

// import 'semantic-ui-css/semantic.min.css'
import './App.css'

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div className="workspace">
          <div className="control-pane">
            <Controls />
          </div>
          <div className="script-pane">
            <Script />
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
