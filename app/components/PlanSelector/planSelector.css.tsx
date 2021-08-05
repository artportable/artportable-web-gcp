import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    paymentOptions: {
      gridArea: 'paymentOptions',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    planCards: {
      display: 'grid',
      gridAutoFlow: 'row',
      gap: '16px',
      justifyContent: 'center',
      alignItems: 'stretch',
      [theme.breakpoints.up('smPlus')]: {
        gridAutoFlow: 'column',
      },
    },
  }),
);
