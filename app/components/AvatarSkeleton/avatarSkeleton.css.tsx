import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: 'flex',
      marginBottom: theme.spacing(1),
    },
    textBox: {
      flexGrow: 1,
      paddingLeft: theme.spacing(1),
    }
  }),
);