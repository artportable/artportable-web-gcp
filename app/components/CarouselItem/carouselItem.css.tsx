import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
    },
    imageContainer: {
      position: 'relative',
      height: '50vh',
      width: '100vw'
    },
    text: {
      position: 'absolute',
      bottom: '100px',
      left: '50px',
      fontSize: '2rem',
      backgroundColor: theme.palette.common.white,
      borderRadius: '4px',
      padding: theme.spacing(1),
      maxWidth: '25vw',
      font: ''
    },
    user: {
      position: 'absolute',
      bottom: '50px',
      right: '60px',
    }
  }),
);
