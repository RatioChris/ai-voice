export const NAMES = [
  'chorus',
  'cor_anglais',
  'violin',

  'chris',
  'paul',
  'seth'
]

export const MOODS = [
  'happy',
  'happy2',
  'happy3',
  'sad',
  'sad2',
  'sad3',
  'angry',
  'eno'
]

const MODES = {
  ionian: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  dorian: ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'],
  phrygian: ['C', 'Db', 'Eb', 'F', 'G', 'Ab', 'Bb'],
  lydian: ['C', 'D', 'E', 'F#', 'G', 'A', 'B'],
  mixolydian: ['C', 'D', 'E', 'F', 'G', 'A', 'Bb'],
  aeolian: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
  locrian: ['C', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb'],
  eno: ['F', 'Ab', 'C', 'Db', 'Eb', 'F', 'Ab']
}

export const MOODS_MODES = {
  happy: MODES.ionian,
  sad2: MODES.dorian,
  sad3: MODES.phrygian,
  happy2: MODES.lydian,
  happy3: MODES.mixolydian,
  sad: MODES.aeolian,
  angry: MODES.locrian,
  eno: MODES.eno
}

export const OCTAVE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
