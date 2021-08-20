import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      gridColumn: '1/4',
      marginTop: 0,
      margin: theme.spacing(5, 0),
      background: theme.palette.grey[200],
      [theme.breakpoints.up('md')]: {
        paddingTop: 0
      }
    },
    flexContainer: {
      position: 'relative',
      display: 'flex',
      gap: theme.spacing(4),
      margin: theme.spacing(2, 2, 0, 2),
      flexDirection: 'column',
      alignItems: 'center',
      flexWrap: 'nowrap',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
      }      
    },
    left: {
      flexBasis: '100%',
      flexGrow: 2,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column',   
      gap: theme.spacing(1),

      [theme.breakpoints.up('smPlus')]: {
        margin: theme.spacing(0, 8),
      },
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 4),
      }
    },
    headline: {
      fontWeight: 400,
      fontFamily: 'Roboto',
    },
    description: {
      [theme.breakpoints.up('md')]: {
        marginRight: '10%',
      },
    },
    right: {
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '100%',
      alignItems: 'flex-end',
      [theme.breakpoints.up('md')]: {
        marginTop: '40px',
      },
      
    },
    paintingContainer: {
      width: '210px',
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',
      alignItems: 'flex-end',
      gap: theme.spacing(1)
    },
    boosted: {
      display: 'block',
      objectFit: 'contain',
      maxHeight: '300px',
      maxWidth: '100%'
    },
    createdBy: {
      display: 'flex',
      gap: theme.spacing(1),
      alignItems: 'center',
      margin: theme.spacing(1, 0),
    },
    chipAvatar: {
      marginLeft: '2px',
      borderRadius: '50%'
    },
    chip: {
      backgroundColor: theme.palette.common.white
    },
    sofaImage: {
      display: 'block',
      width: '100%',
    },
    signupButtonContainer: {
      marginTop: theme.spacing(1)
    },
    buttonLabel: {
      margin: theme.spacing(0, 2)
    },

    [theme.breakpoints.up('sm')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.sm.wide,
        margin: `${theme.spacing(4)}px auto 0 auto`,
      },
      paintingContainer: {
        width: '310px',
      },
    },
    [theme.breakpoints.up('smPlus')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.smPlus.wide,
      },
      paintingContainer: {
        width: '410px',
      },
    },
    [theme.breakpoints.up('md')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.md.wide,
      },
      paintingContainer: {
        width: '280px',
      },
    },
    [theme.breakpoints.up('mdPlus')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.mdPlus.wide,
      }
    },
    [theme.breakpoints.up('lg')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.lg.wide,
      },
      paintingContainer: {
        width: '410px',
      },
    }    
  })
);
