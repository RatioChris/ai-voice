import { combineReducers } from 'redux'
import audio from './audio'
import ui from './ui'

const rootReducer = combineReducers({
  audio,
  ui
})

export default rootReducer
