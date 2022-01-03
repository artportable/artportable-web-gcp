import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { rowGap } from '../app/utils/styleUtils';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      alignItems: 'flex-start',
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      gap: '20px',
      flexWrap: 'wrap',

    },
    wrapper: {
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('mdPlus')]: {
        flexDirection: 'row',
      },
    },
    categories: {
      display: 'flex',
      ...rowGap(32),
    },
    categoryHeading: {
      fontWeight: 500,
      marginBottom: '25px',
      textDecoration: 'underline',
      textDecorationColor: 'var(--ion-color-tertiary)',
      textDecorationThickness: '3px',
      fontSize: '1rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.45rem',
        marginBottom: '50px',
        textDecorationThickness: '6px',
      },   
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
      marginBottom: theme.spacing(1)
    },
    coverImage: {
      width: '100%',
      borderRadius: '5px 5px 0 0',
      [theme.breakpoints.up('md')]: {
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
      backgroundColor: 'var(--ion-color-primary)'
    },
    textContent: {
      padding: '20px',
      display: 'inline-block',
      width: '100%',
      blockSize: 'fit-content',
    },
  }),
);