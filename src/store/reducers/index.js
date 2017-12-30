import { combineReducers } from 'redux'
import app from './app'
import characters from './characters'
import script from './script'

const reducers = combineReducers({
  app,
  characters,
  script
})

export default reducers
