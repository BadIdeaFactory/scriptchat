import React from 'react'
import { Provider } from 'react-redux'
import Controls from './Controls'
import Script from './Script'
import Filedrop from './Filedrop'
import store from '../store'
import BIF_LOGO from './bif_logo.svg'

// import 'semantic-ui-css/semantic.min.css'
import './App.css'

function App (props) {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="workspace">
          <div className="control-pane">
            <Controls />
          </div>
          <div className="script-pane">
            <Script />
            <footer>
              <span>a project by</span>
              <a href="https://biffud.com/"><img src={BIF_LOGO} alt="Bad Idea Factory" /></a>
            </footer>
          </div>
        </div>
        <div className="overlays">
          <Filedrop />
        </div>
      </div>
    </Provider>
  )
}

export default App
