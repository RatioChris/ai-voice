/*
 * actions
 */
export const SET_DRAWER = 'DRAWER'
export const SET_NAME = 'SET_NAME'
export const SET_MOOD = 'SET_MOOD'

/*
 * action creators
 */
export const setDrawer = (bool) => {
  return {
    type: SET_DRAWER,
    bool
  }
}

export const setName = (val) => {
  return {
    type: SET_NAME,
    val
  }
}

export const setMood = (val) => {
  return {
    type: SET_MOOD,
    val
  }
}

/*
 * action methods
 */
export const onSetDrawer = (bool) => {
  return (dispatch, getState, container) => {
    return dispatch(setDrawer(bool))
  }
}

export const onSetName = (val) => {
  return (dispatch, getState, container) => {
    return dispatch(setName(val))
  }
}

export const onSetMood = (val) => {
  return (dispatch, getState, container) => {
    return dispatch(setMood(val))
  }
}
