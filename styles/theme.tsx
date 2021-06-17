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
  common: { white: '#ffffff', black: '#000000'},
  background: { default: "#f4f4f4"},
  primary: {
    main: "#447EFF"
  },
  secondary: {
    main: "#FF8383",
  },
};

interface Breakpoint {
  breakpoint: string,
  regular: number,
  wide: number,
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    breakpointMainWidths: {
      xs: Breakpoint
      sm: Breakpoint,
      smPlus: Breakpoint,
      md: Breakpoint,
      mdPlus: Breakpoint,
      lg: Breakpoint,
      lgPlus: Breakpoint,
      xl: Breakpoint
    }
  }
  interface ThemeOptions {
    breakpointMainWidths: {
      xs: Breakpoint
      sm: Breakpoint,
      smPlus: Breakpoint,
      md: Breakpoint,
      mdPlus: Breakpoint,
      lg: Breakpoint,
      lgPlus: Breakpoint,
      xl: Breakpoint
    }
  }
}

const breakpointMainWidths = {
  xs: { breakpoint: 'xs', regular: 0, wide: 0, },
  sm: { breakpoint: 'sm', regular: 430, wide: 450, },
  smPlus: { breakpoint: 'smPlus', regular: 460, wide: 660, },
  md: { breakpoint: 'md', regular: 669, wide: 860, },
  mdPlus: { breakpoint: 'mdPlus', regular: 869, wide: 1060, },
  lg: { breakpoint: 'lg', regular: 1124, wide: 1300, },
  lgPlus: { breakpoint: 'lgPlus', regular: 1424, wide: 1560, },
  xl: { breakpoint: 'xl', regular: 1624, wide: 1920, },
}

declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    smPlus: true;
    md: true;
    mdPlus: true;
    lg: true;
    lgPlus: true;
    xl: true;
  }
}

const breakpoints = {
  values: {
    xs: 0,
    sm: 460,
    smPlus: 700,
    md: 900,
    mdPlus: 1100,
    lg: 1340,
    lgPlus: 1600,
    xl: 1980,
  }
}

export const theme = createMuiTheme({
  palette,
  typography,
  breakpointMainWidths,
  breakpoints
});

theme.overrides = {
  MuiCssBaseline: {
    '@global': {
      '*::-webkit-scrollbar': {
        width: '10px',
        height: '10px',
        borderRadius: '6px',
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': `inset 0 0 4px ${theme.palette.grey[500]}44`,
        border: `1px solid ${theme.palette.grey[600]}44`,
        borderRadius: '6px'
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: `${theme.palette.grey[700]}66`,
        borderRadius: '6px',
        '&:hover': {
          backgroundColor: theme.palette.grey[700],
        }
      }
    }
  },
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
  MuiButton: {
    root: {
      textTransform: 'none'
    }
  }
}
