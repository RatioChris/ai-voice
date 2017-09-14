import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import './styles.css'

class Sequencer extends Component {
  constructor (props) {
    super(props)

    this.name = props.audio.name
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.audio.name !== nextProps.audio.name) {
      this.name = nextProps.audio.name
      this.speak(this.name)
    }
  }

  componentDidMount () {
    this.speak(this.name)
  }

  speak (name) {
    const synth = window.speechSynthesis
    const msg = new SpeechSynthesisUtterance(name.phonetic)
    msg.rate = 0.01
    msg.voice = synth.getVoices().filter((voice) => {
      return voice.name === 'Whisper'
    })[0]
    synth.speak(msg)
  }

  render () {
    const name = this.props.audio.name

    return (
      <section className='sequencer'>
        <Typography
          type='title'
          color='accent'
          id='name'
        >
          {name.display}
        </Typography>
      </section>
    )
  }
}

export default Sequencer
