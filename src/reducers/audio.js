import {
  SET_NAME,
  SET_MOOD
} from '../actions'

const audio = (state = {
  name: { display: '', phonetic: '' }
  // mood: null
}, action) => {
  switch (action.type) {
    case SET_NAME:
      return Object.assign({}, state, { name: action.val })
    case SET_MOOD:
      return Object.assign({}, state, { mood: action.val })
    default:
      return state
  }
}

export default audio
