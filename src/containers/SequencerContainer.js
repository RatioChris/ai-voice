import { connect } from 'react-redux'
import {
  setDrawer,
  setInstrument
} from '../actions'
import Sequencer from '../components/Sequencer'

const mapStateToProps = (state) => {
  return {
    session: state.session,
    ui: state.ui
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleDrawer: (bool) => {
      dispatch(setDrawer(bool))
    },
    onSetInstrument: (val) => {
      dispatch(setInstrument(val))
    }
  }
}

const SequencerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sequencer)

export default SequencerContainer
