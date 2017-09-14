import { connect } from 'react-redux'
import {
  setName,
  setMood
} from '../actions'
import Controls from '../components/Controls'

const mapStateToProps = (state) => {
  return {
    audio: state.audio
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMood: (val) => {
      dispatch(setMood(val))
    },
    onSetName: (val) => {
      dispatch(setName(val))
    }
  }
}

const ControlsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)

export default ControlsContainer
