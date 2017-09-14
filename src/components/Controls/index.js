import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import { FormControl } from 'material-ui/Form'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import Toolbar from 'material-ui/Toolbar'
import { names } from '../../utils/config'
import './styles.css'

class Controls extends Component {
  constructor (props) {
    super(props)

    this.onSetName = this.onSetName.bind(this)
  }

  onSetName (val) {
    this.props.onSetName(JSON.parse(val))
  }

  render () {
    const audio = this.props.audio || {}

    return (
      <AppBar position='static' color='default' className='controls'>
        <Toolbar className='controls--toolbar'>
          <FormControl className='controls--group'>
            <InputLabel htmlFor='name'>Name</InputLabel>
            <Select
              value={JSON.stringify(audio.name)}
              onChange={e => this.onSetName(e.target.value)}
              input={<Input id='name' />}
            >
              {names.map((name, index) => {
                return (
                  <MenuItem key={`menu-name--${index}`} value={JSON.stringify(name)}>
                    {name.display}
                  </MenuItem>
                )
              }, this)}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Controls
