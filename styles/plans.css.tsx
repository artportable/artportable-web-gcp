import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    plansRootContainer: {
      height: 'var(--viewport-minus-header)',
      backgroundColor: 'var(--background-color)',
      display: 'grid',
      gap: '16px 0',
      gridTemplate: (
      '\". . .\" 1fr' +
      '\". header .\" auto' +
      '\". paymentOptions .\" auto' +
      '\". options .\" auto' +
      '\". . .\" 2fr' +
      '/ 1fr auto 1fr')
    },
    header: {
      gridArea: 'header',
      marginBottom: '3rem'
    },
    paymentOptions: {
      gridArea: 'paymentOptions',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    option: {
      display: 'flex',
      maxWidth: '325px',
    },
    optionBase: {
      extend: 'option',
      paddingTop: '48px'
    },
    optionStandard: {
      extend: 'option'
    },
    optionPremium: {
      extend: 'option',
      paddingTop: '48px'
    },
    options: {
      gridArea: 'options',
      display: 'grid',
      gridAutoFlow: 'column',
      gridAutoColumns: '1fr',
      gap: '16px',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    cardRoot: {
      boxShadow: '0px 0px 11px 0px rgba(var(--ion-color-primary-rgb),0.75)',
      '& .MuiCardContent-root': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& .MuiList-root': {
          flexGrow: 1,
        },
        '& a': {
          alignSelf: 'center'
        },
        '& .MuiButton-root': {
          minWidth: '155px'
        }
      }
    },
  }),
);