
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    toolDiv: {
      justifySelf: 'center',
      [theme.breakpoints.up('lg')]: {
        width: '80%'
      },
      [theme.breakpoints.up('lgPlus')]: {
        width: '100%'
      },
    },
  }),
);