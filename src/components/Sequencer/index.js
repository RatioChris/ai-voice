import React, { Component } from 'react'
import './styles.css'
import * as ImpulseResponse from '../../samples/impulses/AirportTerminal.mp3'

const SAMPLE_LIBRARY = {
  'Voices': [
    { note: 'C', octave: 5, file: require('../../samples/names/chris.mp3') }
  ]
}

const OCTAVE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const LOOPS = [
  {instrument: 'Voices', note: 'F4', duration: 19.7, delay: 4},
  {instrument: 'Voices', note: 'Ab4', duration: 17.8, delay: 8.1},
  {instrument: 'Voices', note: 'C5', duration: 21.3, delay: 5.6},
  {instrument: 'Voices', note: 'Db5', duration: 18.5, delay: 12.6},
  {instrument: 'Voices', note: 'Eb5', duration: 20.0, delay: 9.2},
  {instrument: 'Voices', note: 'F5', duration: 20.0, delay: 14.1},
  {instrument: 'Voices', note: 'Ab5', duration: 17.7, delay: 3.1}
]

let audioContext = new AudioContext()
let sampleCache = {}

class Sequencer extends Component {
  constructor (props) {
    super(props)

    this.playingSince = null
    this.convolver = null
    this.convolverBuffer = null
    this.runningLoops = []

    this.renderUi = this.renderUi.bind(this)
    this.onPlayPause = this.onPlayPause.bind(this)
  }

  componentDidMount () {
    this.init()
  }

  init () {
    this.fetchSample(ImpulseResponse).then(convolverBuffer => {
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
    })
  }

  getSample (instrument, noteAndOctave) {
    let [, requestedNote, requestedOctave] = /^(\w[b#]?)(\d)$/.exec(noteAndOctave)
    requestedOctave = parseInt(requestedOctave, 10)
    requestedNote = this.flatToSharp(requestedNote)
    let sampleBank = SAMPLE_LIBRARY[instrument]
    let nearestSample = this.getNearestSample(sampleBank, requestedNote, requestedOctave)

    return this.fetchSample(nearestSample.file).then(audioBuffer => ({
      audioBuffer: audioBuffer,
      distance: this.getNoteDistance(requestedNote, requestedOctave, nearestSample.note, nearestSample.octave)
    }))
  }

  fetchSample (path) {
    sampleCache[path] = sampleCache[path] || fetch(encodeURIComponent(path))
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))

    return sampleCache[path]
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

  flatToSharp (note) {
    switch (note) {
      case 'Bb': return 'A#'
      case 'Db': return 'C#'
      case 'Eb': return 'D#'
      case 'Gb': return 'F#'
      case 'Ab': return 'G#'
      default: return note
    }
  }

  renderUi () {
    const canvas = this.refs.canvas
    const context = canvas.getContext('2d')
    const arcStrokeLength = 2 // 0.01
    const laneColor = 'rgba(220, 220, 220, 0.3)'
    const soundColor = '#ED146F'
    let radius = 280

    context.clearRect(0, 0, 650, 650)

    context.strokeStyle = '#888'
    context.lineWidth = 1
    context.moveTo(325, 325)
    context.lineTo(650, 325)
    context.stroke()

    context.lineWidth = 30
    context.lineCap = 'round'

    for (const { duration, delay } of LOOPS) {
      const size = Math.PI * 2 / duration
      const offset = this.playingSince ? audioContext.currentTime - this.playingSince : 0
      const startAt = (delay - offset) * size
      const endAt = (delay + arcStrokeLength - offset) * size

      context.strokeStyle = laneColor
      context.beginPath()
      context.arc(325, 325, radius, 0, 2 * Math.PI)
      context.stroke()

      context.strokeStyle = soundColor
      context.beginPath()
      context.arc(325, 325, radius, startAt, endAt)
      context.stroke()

      radius -= 35
    }

    if (this.playingSince) {
      requestAnimationFrame(this.renderUi)
    } else {
      context.fillStyle = 'rgba(0, 0, 0, 0.3)'
      context.strokeStyle = 'rgba(0, 0, 0, 0)'
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
      this.runningLoops.forEach(l => clearInterval(l))
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
