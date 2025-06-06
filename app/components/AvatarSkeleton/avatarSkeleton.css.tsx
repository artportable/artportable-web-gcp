import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: 'flex',
    },
    textBox: {
      flexGrow: 1,
      paddingLeft: theme.spacing(1),
    }
  }),
);