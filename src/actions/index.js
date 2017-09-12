/*
 * actions
 */
export const DRAWER = 'DRAWER'
export const INSTRUMENT = 'INSTRUMENT'

/*
 * action creators
 */
export const setDrawer = (bool) => {
  return {
    type: DRAWER,
    bool
  }
}

export const setInstrument = (val) => {
  return {
    type: INSTRUMENT,
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

export const onSetInstrument = (val) => {
  return (dispatch, getState, container) => {
    return dispatch(setInstrument(val))
  }
}
