import React, { Component } from 'react'
import { pink, grey } from 'material-ui/colors'
import './styles.css'
// import { audioContext, impulseResponse, LOOPS, OCTAVE, SAMPLE_LIBRARY } from '../../utils/Audio'
import Audio from '../../utils/Audio'

const AUDIO = new Audio()
let audioContext
let impulseResponse
let LOOPS
let OCTAVE
let SAMPLE_LIBRARY

class Sequencer extends Component {
  constructor (props) {
    super(props)

    this.convolver = null
    this.convolverBuffer = null
    this.playingSince = null
    this.runningLoops = []
    this.sampleCache = {}

    console.log(props.audio)
    this.mood = props.audio.mood
    this.name = props.audio.name

    this.renderUi = this.renderUi.bind(this)
    this.onPlayPause = this.onPlayPause.bind(this)
  }

  componentDidMount () {
    this.initVars()
    this.initPlay()
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps.audio)
    if (this.props.audio.mood !== nextProps.audio.mood) {
      this.mood = nextProps.audio.mood
      LOOPS = AUDIO.updateLoops(LOOPS, this.mood)
      console.log(LOOPS)

      /* impulseResponse = AUDIO.setImpulseResponse(this.mood)
      this.fetchSample(impulseResponse).then(convolverBuffer => {
        this.convolverBuffer = convolverBuffer
      }) */

      if (this.playingSince) {
        /* this.convolver.disconnect()
        this.convolver = audioContext.createConvolver()
        this.convolver.buffer = this.convolverBuffer
        this.convolver.connect(audioContext.destination) */
        this.playingSince = audioContext.currentTime
        this.runningLoops.forEach(loop => clearInterval(loop))
        this.runningLoops = LOOPS.map(loop => this.startLoop(loop, this.convolver))
      }
    }

    if (this.props.audio.name !== nextProps.audio.name) {
      this.name = nextProps.audio.name
      SAMPLE_LIBRARY = AUDIO.setSampleLibrary(this.name)
    }
  }

  initVars () {
    audioContext = AUDIO.getAudioContext()
    impulseResponse = AUDIO.setImpulseResponse(this.mood)
    LOOPS = AUDIO.setLoops(this.mood)
    OCTAVE = AUDIO.getOctave()
    SAMPLE_LIBRARY = AUDIO.setSampleLibrary(this.name)
    console.log(LOOPS)
  }

  initPlay () {
    this.fetchSample(impulseResponse).then(convolverBuffer => {
      this.convolverBuffer = convolverBuffer

      /* this.convolver = audioContext.createConvolver()
      this.convolver.buffer = convolverBuffer
      this.convolver.connect(audioContext.destination)
      this.playingSince = audioContext.currentTime
      this.runningLoops = LOOPS.map(loop => this.startLoop(loop, this.convolver)) */

      this.renderUi()
    })
  }

  startLoop ({instrument, note, duration, delay}, nextNode) {
    this.playSample(instrument, note, nextNode, delay)

    return setInterval(
      () => this.playSample(instrument, note, nextNode, delay),
      duration * 1000
    )
  }

  playSample (instrument, note, destination, delaySeconds = 0) {
    this.getSample(instrument, note).then(({ audioBuffer, distance }) => {
      let playbackRate = Math.pow(2, distance / 12)
      let bufferSource = audioContext.createBufferSource()

      bufferSource.buffer = audioBuffer
      bufferSource.playbackRate.value = playbackRate

      bufferSource.connect(destination)
      bufferSource.start(audioContext.currentTime + delaySeconds)
      console.log(instrument, note)
    })
  }

  getSample (instrument, noteAndOctave) {
    let [, requestedNote, requestedOctave] = /^(\w[b#]?)(\d)$/.exec(noteAndOctave)
    requestedOctave = parseInt(requestedOctave, 10)
    requestedNote = AUDIO.setFlatToSharp(requestedNote)
    let sampleBank = SAMPLE_LIBRARY[instrument]
    let nearestSample = this.getNearestSample(sampleBank, requestedNote, requestedOctave)

    return this.fetchSample(nearestSample.file).then(audioBuffer => ({
      audioBuffer: audioBuffer,
      distance: this.getNoteDistance(requestedNote, requestedOctave, nearestSample.note, nearestSample.octave)
    }))
  }

  fetchSample (path) {
    this.sampleCache[path] = this.sampleCache[path] || fetch(encodeURIComponent(path))
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))

    return this.sampleCache[path]
  }

  getNearestSample (sampleBank, note, octave) {
    let sortedBank = sampleBank.slice().sort((sampleA, sampleB) => {
      let distanceToA = Math.abs(this.getNoteDistance(note, octave, sampleA.note, sampleA.octave))
      let distanceToB = Math.abs(this.getNoteDistance(note, octave, sampleB.note, sampleB.octave))
      return distanceToA - distanceToB
    })

    return sortedBank[0]
  }

  getNoteDistance (note1, octave1, note2, octave2) {
    return this.noteValue(note1, octave1) - this.noteValue(note2, octave2)
  }

  noteValue (note, octave) {
    return octave * 12 + OCTAVE.indexOf(note)
  }

  renderUi () {
    const canvas = this.refs.canvas
    const context = canvas.getContext('2d')
    const bandColor = 'rgba(220, 220, 220, 0.3)'
    const noteColor = pink[500]
    const arcStrokeLength = 1.5 // 0.01
    let radius = 280

    context.clearRect(0, 0, 650, 650)

    context.strokeStyle = grey[600]
    context.lineWidth = 1
    context.moveTo(325, 325)
    context.lineTo(620, 325)
    context.stroke()

    context.lineWidth = 30
    context.lineCap = 'round'

    for (const { duration, delay } of LOOPS) {
      const size = Math.PI * 2 / duration
      const offset = this.playingSince ? audioContext.currentTime - this.playingSince : 0
      const startAt = (delay - offset) * size
      const endAt = (delay + arcStrokeLength - offset) * size

      context.strokeStyle = bandColor
      context.beginPath()
      context.arc(325, 325, radius, 0, 2 * Math.PI)
      context.stroke()

      context.strokeStyle = noteColor
      context.beginPath()
      context.arc(325, 325, radius, startAt, endAt)
      context.stroke()

      radius -= 35
    }

    if (this.playingSince) {
      requestAnimationFrame(this.renderUi)
    } else {
      context.fillStyle = 'rgba(0, 0, 0, 0.3)'
      context.beginPath()
      context.moveTo(235, 170)
      context.lineTo(485, 325)
      context.lineTo(235, 455)
      context.lineTo(235, 170)
      context.fill()
    }
  }

  onPlayPause (paused) {
    if (this.playingSince) {
      this.convolver.disconnect()
      this.runningLoops.forEach(loop => clearInterval(loop))
      this.playingSince = null
    } else {
      this.convolver = audioContext.createConvolver()
      this.convolver.buffer = this.convolverBuffer
      this.convolver.connect(audioContext.destination)
      this.playingSince = audioContext.currentTime
      this.runningLoops = LOOPS.map(loop => this.startLoop(loop, this.convolver))
    }

    this.renderUi()
  }

  render () {
    return (
      <section className='sequencer'>
        <canvas
          ref='canvas'
          id='canvas'
          width='650'
          height='650'
          onClick={this.onPlayPause}
        />
      </section>
    )
  }
}

export default Sequencer
