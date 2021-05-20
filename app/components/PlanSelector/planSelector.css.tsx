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
      gridAutoFlow: 'column',
      gap: '16px',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
  }),
);
