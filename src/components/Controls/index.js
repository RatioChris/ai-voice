import React, { Component } from 'react'
import { MOODS, NAMES } from '../../utils/config'
import AppBar from 'material-ui/AppBar'
import { FormControl } from 'material-ui/Form'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import Toolbar from 'material-ui/Toolbar'
import './styles.css'

class Controls extends Component {
  constructor (props) {
    super(props)

    this.onSetMood = this.onSetMood.bind(this)
    this.onSetName = this.onSetName.bind(this)
  }

  onSetMood (val) {
    this.props.onSetMood(val)
  }

  onSetName (val) {
    this.props.onSetName(val)
  }

  render () {
    const audio = this.props.audio || {}

    return (
      <AppBar position='static' color='default' className='controls'>
        <Toolbar className='controls--toolbar'>
          <FormControl className='controls--group'>
            <InputLabel htmlFor='name'>Name</InputLabel>
            <Select
              value={audio.name}
              onChange={e => this.onSetName(e.target.value)}
              input={<Input id='name' />}
            >
              {NAMES.map((item, index) => {
                return (
                  <MenuItem key={`menu-name--${index}`} value={item}>
                    {item}
                  </MenuItem>
                )
              }, this)}
            </Select>
          </FormControl>

          <FormControl className='controls--group'>
            <InputLabel htmlFor='mood'>Mood</InputLabel>
            <Select
              value={audio.mood}
              onChange={e => this.onSetMood(e.target.value)}
              input={<Input id='mood' />}
            >
              {MOODS.map((item, index) => {
                return (
                  <MenuItem key={`menu-mood--${index}`} value={item}>
                    {item}
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
