import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    rowsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2)
    },
    row: {
      display: 'flex',
      gap: theme.spacing(2),
      justifyContent: 'space-between'
    },
  }),
);
