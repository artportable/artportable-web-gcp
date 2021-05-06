import { createMuiTheme } from "@material-ui/core/styles";

const typography = {
  h1: {
    fontSize: '2rem',
  },
  h2: {
    fontSize: '1.75rem',
  },
  h3: {
    fontSize: '1.5rem',
  },
  h4: {
    fontSize: '1.25rem',
  },
  h5: {
    fontSize: '1rem'
  },
  h6: {
    fontSize: '0.95rem'
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
  background: { default: "#f4f4f4"},
  primary: {
    main: "#447EFF"
  },
  secondary: {
    main: "#FF8383",
  },
};

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    breakpointMainWidths: {
      sm: number,
      md: number, 
      lg: number
    }
  }
  interface ThemeOptions {
    breakpointMainWidths: {
      sm: number,
      md: number, 
      lg: number
    }
  }
}

const breakpointMainWidths = {
  sm: 430,
  md: 669,
  lg: 1224
}

export const theme = createMuiTheme({
  palette,
  typography,
  breakpointMainWidths
});

theme.overrides = {
  MuiCardHeader: {
    root: {
      padding: theme.spacing(2),
      '& + .MuiCardContent-root': {
        paddingTop: theme.spacing(0),
      },
    },
  },
  MuiCardContent: {
    root: {

      padding: theme.spacing(2),
      // This is just a more specific selector than Mui's own selector
      // to have more padding bottom.
      '&:last-child': {
        paddingBottom: theme.spacing(2.5)
      }
    },
  },
  MuiCardActions: {
    root: {
      padding: theme.spacing(2),
    },
  },
}
