import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
    },
    text: {
      position: 'absolute',
      top: '35%',
      left: '25%',
      transform: 'translate(-50%, -50%)',

      fontSize: '400%',
      backgroundColor: 'white'
    },
    user: {
      position: 'absolute',
      bottom: '50px',
      right: '60px',
    }
  }),
);
