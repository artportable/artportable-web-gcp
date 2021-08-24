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
    imageContainer: {
      borderRadius: '2px',
      overflow: 'hidden',
      '& img': {
        display: 'block'
      }
    },
    footer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing(0.8, 0, 0, 0),
    },
    username: {
      marginLeft: '10px',
      fontWeight: 500
    },
    hidden: {
      display: 'none',
      '&.MuiSkeleton-root': {
        display: 'none'
      }
    }
  }),
);