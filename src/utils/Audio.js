import { MOODS_MODES, OCTAVE } from './config'
import ImpulseResponse1 from '../samples/impulses/AirportTerminal.mp3'
import ImpulseResponse2 from '../samples/impulses/NaturalHall.mp3'
import ImpulseResponse3 from '../samples/impulses/PrimeShort.mp3'

/*
 * public
 */
export default class Audio {
  // sets
  setFlatToSharp (note) {
    return _setFlatToSharp(note)
  }

  setImpulseResponse (mood) {
    return _setImpulseResponse(mood)
  }

  setLoops (mood) {
    return _setLoops(mood)
  }

  updateLoops (loops, mood) {
    return _updateLoops(loops, mood)
  }

  setSampleLibrary (name) {
    return _setSampleLibrary(name)
  }

  // gets
  getAudioContext () {
    return new AudioContext()
  }

  getOctave () {
    return OCTAVE
  }
}

/*
 * private
 */
const _setFlatToSharp = (note) => {
  switch (note) {
    case 'Bb': return 'A#'
    case 'Db': return 'C#'
    case 'Eb': return 'D#'
    case 'Gb': return 'F#'
    case 'Ab': return 'G#'
    default: return note
  }
}

const _setImpulseResponse = (mood) => {
  switch (mood) {
    case 'happy': return ImpulseResponse3
    case 'sad': return ImpulseResponse1
    default: return ImpulseResponse2
  }
}

const _setLoops = (mood) => {
  const scale = MOODS_MODES[mood]
  const octave = 5
  let arr = []

  for (var note of scale) {
    arr.push({
      instrument: 'Voices',
      note: `${note}${octave}`,
      duration: _getRandom(16, 22),
      delay: _getRandom(3, 14)
    })
  }

  return arr
}

const _updateLoops = (loops, mood) => {
  const scale = MOODS_MODES[mood]
  const octave = 5
  let arr = []
  let i = 0

  for (var loop of loops) {
    loop.note = `${scale[i]}${octave}`
    arr.push(loop)
    i++
  }

  return arr
}

const _setSampleLibrary = (name) => {
  const octave = 5

  return {
    'Voices': [
      { note: 'C', octave: octave, file: require(`../samples/instruments/${name}.mp3`) }
    ]
  }
}

const _getRandom = (min, max) => {
  const num = Math.random() * (max - min) + min
  return Number(num.toFixed(1))
}
