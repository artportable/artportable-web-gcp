import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    tagsContainer: {
      display: 'flex',
      gap: theme.spacing(1),
      flexWrap: 'wrap'
    },
  
    buttonPosition: {
      marginTop: theme.spacing(1),
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: 'clamp(10px, 100vw - 88px, 660px)',
      gap: theme.spacing(2)
    }
  }),
);
