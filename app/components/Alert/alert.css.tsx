import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      color: 'black',
      backgroundColor: 'white',
      padding: '10px',
      textAlign: 'center',
    }
  }),
);