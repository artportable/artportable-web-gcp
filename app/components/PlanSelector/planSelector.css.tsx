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
      gridAutoColumns: '1fr',
      gap: '16px',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
  }),
);
