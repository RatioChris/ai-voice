import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import './styles.css'

class Sequencer extends Component {
  constructor (props) {
    super(props)

    this.name = props.audio.name
  }

  componentDidMount () {
    this.speak(this.name)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.audio.name !== nextProps.audio.name) {
      this.addClass()

      this.name = nextProps.audio.name
      this.speak(this.name)
    }
  }

  speak (name) {
    const synth = window.speechSynthesis
    const msg = new SpeechSynthesisUtterance(name.phonetic)
    msg.rate = 0.01
    msg.voice = synth.getVoices().filter(voice => {
      return voice.name === 'Whisper'
    })[0]
    msg.onend = (event) => {
      console.log('Speech has finished after ' + event.elapsedTime + ' milliseconds.')
      this.removeClass()
    }

    synth.speak(msg)
  }

  addClass () {
    const elem = document.getElementById('name')
    elem.classList.add('display')
  }

  removeClass () {
    const elem = document.getElementById('name')
    elem.classList.remove('display')
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
