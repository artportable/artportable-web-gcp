import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { columnGap, rowGap } from '../../utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      gridColumn: '1/4',
      padding: theme.spacing(5, 1, 0, 1),
      background: theme.palette.grey[200],
    },
    flexContainer: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 'auto',
      marginRight: 'auto',
      ...columnGap(theme.spacing(4)),
      alignItems: 'center',
      flexWrap: 'nowrap',      
      
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        ...columnGap(0),
      }      
    },
    left: {
      textAlign: 'center',
      flexBasis: '100%',
      flexGrow: 2,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column',
      ...columnGap(
        theme.spacing(1),
      ),

      [theme.breakpoints.up('smPlus')]: {
        margin: theme.spacing(0, 8, 4, 8),
      },
      [theme.breakpoints.up('md')]: {
        textAlign: 'initial',
        margin: theme.spacing(0, 0, 4, 4),
      }
    },
    headline: {
      fontWeight: 600
    },
    description: {
      margin: theme.spacing(1, 0,),
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
      width: '190px',
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
        width: theme.breakpointMainWidths.sm.wide
      },
      paintingContainer: {
        width: '250px',
      },
    },
    [theme.breakpoints.up('smPlus')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.smPlus.wide,
      },
      paintingContainer: {
        width: '380px',
      },
    },
    [theme.breakpoints.up('md')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.md.wide,
      },
      paintingContainer: {
        width: '200px',
      },
    },
    [theme.breakpoints.up('mdPlus')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.mdPlus.wide,
      },
      paintingContainer: {
        width: '260px',
      },
    },
    [theme.breakpoints.up('lg')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.lg.wide,
      },
      paintingContainer: {
        width: '320px',
      },
    }    
  })
);
