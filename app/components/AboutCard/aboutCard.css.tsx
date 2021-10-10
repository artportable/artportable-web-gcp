import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    mainCard: {
      gridArea: 'mainCard',
    },
    mainCardContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
    },
    profilePictureDiv: {
     display: 'flex',
     justifyContent: 'center'
    },
    textContent: {
      maxWidth: '100%',
      flexBasis: 'auto',
    },
    name: {
      textAlign: 'center',
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
      width: 'clamp(150px, 100%, 300px)',
    },

    [theme.breakpoints.up('sm')]: {
      about: {
      margin: '0 10px',
    },
    },
    [theme.breakpoints.up('mdPlus')]: {
      mainCardContent: {
        flexDirection: 'row',
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