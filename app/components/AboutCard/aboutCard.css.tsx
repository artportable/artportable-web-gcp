import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { rowGap, columnGap } from '../../utils/styleUtils';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    mainCard: {
      gridArea: 'mainCard',
    },
    mainCardContent: {
      display: 'flex',
      flexDirection: 'column',
      ...columnGap(16),
    },
    profilePictureDiv: {
     alignSelf: 'center',
    },
    textContent: {
      maxWidth: '100%',
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
      alignItems: "center",
      fontWeight: 500,
      fontFamily: "LyonDisplay",
      justifyContent: 'center'
    },
    artistTitle: {
      textAlign: 'center',
      fontWeight: 500,
      fontFamily: "LyonDisplay",
      marginBottom: theme.spacing(1)
    },
    profilePicture: {
      width: '300px',
    },
    about: {
        whiteSpace: "pre-wrap"
      },

    [theme.breakpoints.up('sm')]: {
      about: {
      margin: '0 10px',
    },
    },
    [theme.breakpoints.up('lg')]: {
      mainCardContent: {
        flexDirection: 'row',
        ...rowGap(16),
      },
      textContent: {
        maxWidth: '70%',
      },
      profilePictureDiv: {
      alignSelf: 'initial',
          flexGrow: 1,
          display: 'initial'
      },
      name: {
        textAlign: 'initial',
      },
      artistTitle: {
      textAlign: 'initial',
      },
      location: {
        justifyContent: 'initial'
      },
      about: {
      margin: '0',
    },
    },
  }),
);