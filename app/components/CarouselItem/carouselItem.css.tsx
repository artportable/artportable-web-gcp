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
      top: '100px',
      left: '50px',
      fontSize: '3rem',
      backgroundColor: theme.palette.common.white,
      borderRadius: '8px',
      padding: theme.spacing(2, 2, 1, 2),
      maxWidth: '40vw',
      font: ''
    },
    user: {
      position: 'absolute',
      bottom: '50px',
      right: '60px',
    }
  }),
);
