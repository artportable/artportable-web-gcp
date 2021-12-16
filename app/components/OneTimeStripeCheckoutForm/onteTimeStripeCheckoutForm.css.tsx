import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const checkoutFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    resultMessage: {
      color: 'var(--ion-color-success)'
    },
    container: {
      border: `3px solid var(--ion-color-primary)`,
      borderRadius: '10px',
      backgroundColor: 'white',
      width: '255px',
      marginTop: '3px',   
      [theme.breakpoints.up('smPlus')]: {
        width: 'initial',
      },
    },
    heading: {
      margin: "10px 0 0 10px"
    },
    cardElementContainer: {
      height: '32px',
      paddingTop: '2px',
      paddingLeft: '1px',
      margin: '20px 10px 0 10px'
    },
    cardErrorContainer: {
      height: '20px',
      color: 'var(--ion-color-danger)',
      margin: '0 10px',
      fontSize: '0.8rem',
      [theme.breakpoints.up('smPlus')]: {
        width: 'initial',
        fontSize: '1rem',
      },
    },
    subtotal: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
      margin: '0 10px'
    },
    productsRow: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0 10px'
    },
    products: {
      display: 'flex',
      flexDirection: 'column',
      margin: '0 10px'
    },
    divider: {
      borderBottom: 'solid 1px var(--ion-color-medium)',
      marginTop: '20px',
      margin: '0 10px'
    },
    payButton: {
      margin: '0px 10px 10px 10px'
    },
  }),
);