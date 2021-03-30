import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none'
    },
    rounded: {
      borderRadius: '24px'
    },
  }),
);