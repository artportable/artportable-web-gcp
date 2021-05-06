import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      display: 'flex',
      gap: theme.spacing(2)
    },
  }),
);
