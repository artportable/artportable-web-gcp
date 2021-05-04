import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '8px',
      marginBottom: '5px',
    },
    image: {
      marginBottom: '5px'
    },
    footer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    username: {
      marginLeft: '10px',
      fontWeight: 500
    }
  }),
);