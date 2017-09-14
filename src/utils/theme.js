import { createMuiTheme } from 'material-ui/styles'
import { pink, grey, red } from 'material-ui/colors'
import 'typeface-quicksand'

const palette = {
  primary: pink,
  accent: grey,
  error: red,
  type: 'dark'
}

const typography = {
  fontFamily: '"Quicksand", sans-serif',
  fontSize: 12,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 700
}

const theme = createMuiTheme({
  palette: palette,
  typography: typography
})

export default theme
