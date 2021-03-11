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

const overrides = {
  MuiCard: {
    root: {
      boxShadow: '0px 0px 11px 0px rgba(var(--ion-color-primary-rgb),0.75)'
    }
  },
  MuiCardContent: {
    root: {
      padding: '26px',
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