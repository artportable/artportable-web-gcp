import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { columnGap, rowGap } from '../../utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      gridColumn: '1/4',
      padding: theme.spacing(1, 1, 0, 1),
      background: theme.palette.grey[200],
      backgroundColor: 'var(--background-color-darker)'
    },
    flexContainer: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column-reverse',
      marginLeft: 'auto',
      marginRight: 'auto',
      ...columnGap(theme.spacing(4)),
      alignItems: 'center',
      flexWrap: 'nowrap',
      padding: '0, 5px',
      
      [theme.breakpoints.up('md')]: {
        padding: '0',
        flexDirection: 'row',
        ...columnGap(0),
      }      
    },
    left: {
      textAlign: 'left',
      flexBasis: '100%',
      flexGrow: 2,
      width: '90&',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column',
      ...columnGap(
        theme.spacing(1),
      ),
      marginRight: '16px',
      marginLeft: '16px',
      margin: theme.spacing(0, 0, 4, 0),

      [theme.breakpoints.up('smPlus')]: {
        margin: theme.spacing(0, 0, 2, 0),
        width: '567px',
      },
      [theme.breakpoints.up('md')]: {
        textAlign: 'initial',
        margin: theme.spacing(0, 0, 4, 4),
      }
    },
    headline: {
      fontWeight: 600,
      fontSize: '1.9rem',
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        fontSize: '2.9rem',

    },
      [theme.breakpoints.up('md')]: {
        textAlign: 'left',
    },
  },
    subHeadline: {
      '& span': {
        fontSize: '1.3rem',
      },
      fontWeight: 500,
      margin: theme.spacing(0, 2, 0, 1),
      textAlign: 'left',
      fontSize: '1rem',
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(0, 2, 1, 1),
        fontWeight: 600,
      },
    },
    
    description: {
      margin: theme.spacing(1, 0,),
      marginBottom: theme.spacing(2),
      fontSize: '11pt',
      lineHeight: '1.28',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.3rem',
      },
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(3),
      }
    },
    right: {
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '100%',
      alignItems: 'flex-end',
      [theme.breakpoints.up('md')]: {
        marginTop: '20px',
      },
      
    },
    flexheaderButton: {
      display: 'flex',
      ...rowGap(
        theme.spacing(3)),
      flexDirection: 'column',
      marginTop: '-20px',
      
      [theme.breakpoints.up('smPlus')]: {
        flexDirection: 'row',
        marginTop: '0',
      },
    },
    headerButtonArtlover: {
      display: 'flex',
      alignContent: 'flex-start',
      alignItems: 'left',

      marginBottom: theme.spacing(6),
      [theme.breakpoints.up('md')]: {

        marginBottom: theme.spacing(2)
      },
    },
    headerButtonArtist: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      marginTop: '10px',
      [theme.breakpoints.up('smPlus')]: {
        marginTop: '0',
      },
    },
    
    paintingContainer: {

      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',
      alignItems: 'flex-end',
      gap: theme.spacing(1),
      margin: '0 20px',
      [theme.breakpoints.up('sm')]: {

      },
      [theme.breakpoints.up('smPlus')]: {

      },
    },
    boosted: {
      display: 'block',
      objectFit: 'contain',
      maxHeight: '800px',
      maxWidth: '100%',
      filter: 'drop-shadow(8px 8px 8px rgba(0, 0, 0, 0.4))'
    },
    createdBy: {
      display: 'flex',
      gap: theme.spacing(1),
      alignItems: 'center',
      margin: theme.spacing(1, 0, 0, 0 ),
      [theme.breakpoints.up('smPlus')]: {
        margin: theme.spacing(1, 0, 2, 0 ),
      },
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
      fontSize: '0.9rem',
      // margin: theme.spacing(0, 1),
      [theme.breakpoints.up('sm')]: {
        fontSize: 'initial',
        margin: theme.spacing(0, 1),
      },
      [theme.breakpoints.up('smPlus')]: {
        fontSize: 'initial',
        margin: theme.spacing(0, 2),
      },
    },
    becomeMemberButton: {
      marginRight: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(2),
      },
    },
    

    [theme.breakpoints.up('sm')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.sm.wide
      },
      // paintingContainer: {
      //   width: '250px',
      // },
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
        width: '250px',
      },
    },
    [theme.breakpoints.up('mdPlus')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.mdPlus.wide,
      },
      paintingContainer: {
        width: '300px',
      },
    },
    [theme.breakpoints.up('lg')]: {
      flexContainer: {
        width: theme.breakpointMainWidths.lg.wide,
      },
      paintingContainer: {
        width: '400px',
      },
    }, 
  })
);