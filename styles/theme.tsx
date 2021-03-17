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
    main: "#FF8383",
  },
  test: {
    main: "#ec407a"
  }
}

const overrides = {
  MuiCardContent: {
    root: {
      padding: '26px',
      // This is just a more specific selector than Mui's own selector
      // to have more padding bottom.
      '&:last-child': {
        paddingBottom: '32px'
      }
    },
  },
}

export const theme = createMuiTheme({
  palette,
  typography,
  overrides
});