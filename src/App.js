import React, { Component } from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import ControlsContainer from './containers/ControlsContainer'
import SequencerContainer from './containers/SequencerContainer'
import theme from './utils/theme'
import './App.css'

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <div className='App'>
          <SequencerContainer />
          <ControlsContainer />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
