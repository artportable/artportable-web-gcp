import { createMuiTheme } from "@material-ui/core/styles";

const typography = {
  h1: {
    fontSize: '2rem',
  },
  h2: {
    fontSize: '1.75rem',
  },
  body1: {
    fontSize: '0.925rem',
  },
  body2: {
    fontSize: '0.825rem',
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
  MuiCardHeader: {
    root: {
      padding: '8px',
    }
  }
}

export const theme = createMuiTheme({
  palette,
  typography,
  overrides
});