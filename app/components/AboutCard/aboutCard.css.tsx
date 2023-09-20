import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { rowGap, columnGap } from '../../utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    mainCard: {
      gridArea: 'mainCard'
    },
    mainCardContent: {
      display: 'flex',
      flexDirection: 'column',
      ...columnGap(16)
    },
    profilePictureDiv: {
      alignSelf: 'center'
    },
    textContent: {
      maxWidth: '100%'
    },
    name: {
      textAlign: 'center',
      fontWeight: 500,
      fontFamily: 'LyonDisplay',
      fontSize: '1.35rem',
      lineHeight: '1.235'
    },
    location: {
      display: 'flex',
      position: 'relative',
      left: '-4px',
      alignItems: 'center',
      fontWeight: 400,
      fontFamily: 'LyonDisplay',
      justifyContent: 'center',
      fontSize: '1rem'
    },
    locationPin: {
      color: '#3e3e3ec7'
    },
    artistTitle: {
      textAlign: 'center',
      fontWeight: 500,
      fontFamily: 'LyonDisplay',
      marginBottom: theme.spacing(1),
      fontSize: '2em',
    },
    artistHeadline: {
      fontSize: '1.5em',
      textAlign: 'center',
      fontWeight: 400,
      fontFamily: 'LyonDisplay',
      marginBottom: theme.spacing(1),
      [theme.breakpoints.up('lgPlus')]: {
        margin: '0 10px',
      }
    },
    profilePicture: {
      width: '300px'
    },
    about: {
      whiteSpace: 'pre-wrap',
      margin: '0'
    },

    [theme.breakpoints.up('sm')]: {
      about: {
        margin: '0 10px'
      }
    },
    [theme.breakpoints.up('lg')]: {
      mainCardContent: {
        flexDirection: 'row',
        ...rowGap(16)
      },
      textContent: {
        maxWidth: '70%'
      },
      profilePictureDiv: {
        alignSelf: 'initial',
        flexGrow: 0.5,
        display: 'initial'
      },
      name: {
        textAlign: 'center'
      },
      artistTitle: {
        textAlign: 'center'
      },
      location: {
        justifyContent: 'center',
        marginTop: '0.7vh'
      },
      about: {
        margin: '0'
      }
    }
  })
)
