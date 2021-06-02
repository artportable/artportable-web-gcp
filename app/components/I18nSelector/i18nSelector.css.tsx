import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: theme.palette.background.default,
    }
  }),
);
