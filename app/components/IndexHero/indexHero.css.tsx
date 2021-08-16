import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.grey[300],
      paddingTop: '50px',
      [theme.breakpoints.up('md')]: {
        paddingTop: 0
      }
    },
    flexContainer: {
      position: 'relative',
      display: 'flex',
      gap: theme.spacing(4),
      flexDirection: 'column',
      alignItems: 'center',
      flexWrap: 'nowrap',

      [theme.breakpoints.up('sm')]: {
        marginLeft: `calc((100vw - ${theme.breakpointMainWidths.sm.wide}px)/2)`,
        marginRight: `calc((100vw - ${theme.breakpointMainWidths.sm.wide}px)/2)`
      },
      [theme.breakpoints.up('smPlus')]: {
        marginLeft: `calc((100vw - ${theme.breakpointMainWidths.smPlus.wide}px)/2)`,
        marginRight: `calc((100vw - ${theme.breakpointMainWidths.smPlus.wide}px)/2)`,
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: `calc((100vw - ${theme.breakpointMainWidths.md.wide}px)/2)`,
        marginRight: `calc((100vw - ${theme.breakpointMainWidths.md.wide}px)/2)`,
        flexDirection: 'row'
      },
      [theme.breakpoints.up('mdPlus')]: {
        marginLeft: `calc((100vw - ${theme.breakpointMainWidths.mdPlus.wide}px)/2)`,
        marginRight: `calc((100vw - ${theme.breakpointMainWidths.mdPlus.wide}px)/2)`,
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft: `calc((100vw - ${theme.breakpointMainWidths.lg.regular}px)/2)`,
        marginRight: `calc((100vw - ${theme.breakpointMainWidths.lg.regular}px)/2)`,

      },
      [theme.breakpoints.up('lgPlus')]: {
        marginLeft: `calc((100vw - ${theme.breakpointMainWidths.lgPlus.regular}px)/2)`,
        marginRight: `calc((100vw - ${theme.breakpointMainWidths.lgPlus.regular}px)/2)`,
      },
      [theme.breakpoints.up('xl')]: {
        marginLeft: `calc((100vw - ${theme.breakpointMainWidths.xl.regular}px)/2)`,
        marginRight: `calc((100vw - ${theme.breakpointMainWidths.xl.regular}px)/2)`,
      },
      
    },
    left: {
      flexBasis: '100%',
      flexGrow: 2,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column',   
      
      [theme.breakpoints.up('md')]: {
        flexBasis: '85%',       
      },
      [theme.breakpoints.up('lg')]: {
        flexBasis: '100%',       
      },  
    },
    headline: {
      fontWeight: 400,
      fontFamily: 'LyonDisplay',
      fontSize: '3.1rem'
    },
    description: {
      [theme.breakpoints.up('md')]: {
        marginRight: '45%',
      },
    },
    right: {
      flexBasis: '100%',
      flexShrink: 2,
      alignItems: 'flex-end',
      [theme.breakpoints.up('md')]: {
        marginTop: '40px',
      },
      
    },
    paintingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',
      alignItems: 'flex-end',
    },
    outerFrame: {
      border: '6px solid black',
    },
    innerFrame: {
      border: '16px solid white',
    },
    boosted: {
      display: 'block',
      objectFit: 'contain',
      maxHeight: '300px',
      width: '100%'
    },
    createdBy: {
      display: 'flex',
      gap: theme.spacing(1),
      alignItems: 'center',
      margin: theme.spacing(1, 0),
    },
    chipAvatar: {
      marginLeft: '2px',
      borderRadius: '50%',
    },
    bgImage: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
    },
    soffa: {
      position: 'relative',
      right: 0,
      display: 'block',
      marginLeft: 'auto',
      width: '100%',

      [theme.breakpoints.up('md')]: {
        width: '55%',        
      },
    },


  })
);
