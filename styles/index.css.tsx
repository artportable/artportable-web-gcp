import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    carouselContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '30px'
    },
    artworkGrid: {
      marginTop: '64px',
      marginBottom: '48px',
    },
    welcomeToTexts: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
      textAlign: 'center',
      alignItems: 'center'
    },
    header: {
      maxWidth: '400px'
    },
    description: {
      maxWidth: '400px'
    },
    ourMemberships: {
      fontWeight: 500
    }
  }),
);
