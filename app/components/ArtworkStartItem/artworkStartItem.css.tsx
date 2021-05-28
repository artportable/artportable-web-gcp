import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      overflow: 'hidden'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '5px',
    },
    footer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing(0.2, 0, 0, 0.4),
    },
    username: {
      marginLeft: '10px',
      fontWeight: 500
    }
  }),
);