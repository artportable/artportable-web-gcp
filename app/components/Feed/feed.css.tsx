import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    divInviteButton: {
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.up('smPlus')]: {
        display: 'none'
      },
    }
  }),
);