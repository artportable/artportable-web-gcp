import { createMuiTheme } from "@material-ui/core/styles";

const typography = {
  h1: {
    fontSize: '2rem',
  },
  button: {
    fontFamily: 'GT-America-Standard'
  },
  fontFamily: [
    'GT-America-Standard',
    'LyonDisplay',
  ].join(','),
}

const palette = {
  primary: {
    main: "#447EFF"
  },
  secondary: {
    main: "#3dc2ff",
  }
}

export const theme = createMuiTheme({
  palette,
  typography
});