import { combineReducers } from 'redux'
import app from './app'
import script from './script'

const reducers = combineReducers({
  app,
  script
})

export default reducers
