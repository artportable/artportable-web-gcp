import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none'
    },
    rounded: {
      borderRadius: '24px'
    },
    secondary: {
      color: '#ffffff',
      backgroundColor: theme.palette.secondary.main
    }
  }),
);