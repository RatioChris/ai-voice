/* global localStorage */

import {
  INSTRUMENT
} from '../actions'

const session = (state = {
  instrument: localStorage.getItem('instrument') || 'guitar'
}, action) => {
  switch (action.type) {
    case INSTRUMENT:
      return Object.assign({}, state, { instrument: action.val })
    default:
      return state
  }
}

export default session
