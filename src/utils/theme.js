import createMuiTheme from 'material-ui/styles/theme'
import createPalette from 'material-ui/styles/palette'
import createTypography from 'material-ui/styles/typography'
import { blue, brown, red } from 'material-ui/colors'
import 'typeface-baloo'

const palette = createPalette({
  primary: blue,
  accent: brown,
  error: red,
  type: 'light'
})

const typographyConstants = {
  fontFamily: '"Baloo", "Helvetica", "Arial", sans-serif',
  fontSize: 12,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 800
}

const typography = createTypography(palette, typographyConstants)

const create = (theme) => createMuiTheme(Object.assign({}, theme, {
  typography,
  palette
}))

export default create()
