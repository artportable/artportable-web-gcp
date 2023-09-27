import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr', // Single column layout by default
      gap: '2vw',
      marginTop: '2vh',
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '2fr 4fr',
        gap: '3vw',
        marginTop: '2vh'
      },
    },
    imgAndTextWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '2vw',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {

      },
    },
    imgContainer: {
      textAlign: 'center',
    },
    profilePicture: {
      width: '100%',
      maxWidth: '300px',
      display: 'block',
      margin: '0 auto',
    },
    textContainer: {
      textAlign: 'center',
      [theme.breakpoints.up('md')]: {
        textAlign: 'left',
      },
    },

    bioText: {
      marginLeft: '2vw',
      [theme.breakpoints.up('md')]: {
        gridColumn: 'span 1', // Occupy one column on screens wider than md (960px)
        textAlign: 'left', // Align bioText to the left
      },
    },
  })
);
