import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { rowGap, columnGap } from '../../utils/styleUtils';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      alignItems: 'flex-start',
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      ...columnGap(20),
      flexWrap: 'wrap',

    },
    wrapper: {
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('lg')]: {
        flexDirection: 'row',
      },
    },
    categories: {
      display: 'flex',
      // ...rowGap(16),
    },
    categoryHeading: {
      fontWeight: 500,
      marginBottom: '25px',
      paddingBottom: '10px',
      borderBottom: '5px solid var(--ion-color-tertiary)',
      lineHeight: '10px',
      fontSize: '1rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.45rem',
        marginTop: theme.spacing(2),
      },
    },
    underline: {
      backgroundColor: 'pink',
      height: '3px',
    },
    categoryHeadingSecondary: {
      fontWeight: 400,
      fontSize: '1rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.45rem',
      },
    },
    headline: {
      textDecoration: 'underline',
      marginBottom: theme.spacing(1),
    },
    coverImage: {
      width: '100%',
      borderRadius: '5px 5px 0 0',
      [theme.breakpoints.up('lg')]: {
        flexDirection: 'row',
        borderRadius: '5px 0 0 5px',
      },
    },
    dateSpan: {
      textAlign: 'right',
      marginTop: '8px',
      color: '#999999',
    },
    line: {
      marginTop: theme.spacing(1),
      height: '4px',
      backgroundColor: 'var(--primary-color)'
    },
    textContent: {
      padding: '20px',
      display: 'inline-block',
      width: '100%',
      blockSize: 'fit-content',
      color: 'var(--text-color)',
    },
    menuFlex: {
      display: 'flex',
      flexDirection: 'row',
      ...rowGap(5),
      flexWrap: 'wrap',
      marginBottom: '20px',
    },
    link: {
      '&:hover': {
        textDecoration: 'none',
      },
    }
  }),
);