import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: '400px',
      width: '100%',
    },
    notifications: {
      padding : theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      gap: theme.spacing(2)
    },
    newTitle : {
      color : theme.palette.primary.main,
      marginBottom : theme.spacing(2)
    },
    oldTitle : {
      color : theme.palette.secondary.main,
      marginBottom : theme.spacing(2)
    }
  })
);