import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { BorderBottomSharp } from '@material-ui/icons';

export const checkoutStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'var(--background-color)',
      height: 'var(--viewport-minus-header)',
      display: 'grid',
      gap: '16px 0',
      gridTemplate: (
      '\". . .\" 2fr' +
      '\". payment-card .\" auto' +
      '\". . .\" 4fr' +
      '/ 1fr auto 1fr'),
      
    },
    card: {
      gridArea: 'payment-card',
      [theme.breakpoints.up('md')]: {
        width: '40rem',
      },
      '& .MuiCardContent-root > *:not(:last-child)': {
        marginBottom: '8px',
      }
    },
    subtotal: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: 'solid 1px ' + theme.palette.primary.main,
      marginBottom: '20px'
    },
    product: {
      display: 'flex',
      justifyContent: 'space-between',
    }
  }),
);