import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { BorderBottomSharp } from '@material-ui/icons';

export const checkoutStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'var(--background-color)',
      height: '100vh',
      paddingTop: 'var(--header-plus-box-shadow-padding)',
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
      boxShadow: '0px 0px 11px 0px rgba(var(--ion-color-primary-rgb),0.75)',
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