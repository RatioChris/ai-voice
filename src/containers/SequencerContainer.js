import { connect } from 'react-redux'
import {
  setName,
  setMood
} from '../actions'
import Sequencer from '../components/Sequencer'

const mapStateToProps = (state) => {
  return {
    audio: state.audio
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetName: (val) => {
      dispatch(setName(val))
    },
    onSetMood: (val) => {
      dispatch(setMood(val))
    }
  }
}

const SequencerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sequencer)

export default SequencerContainer
