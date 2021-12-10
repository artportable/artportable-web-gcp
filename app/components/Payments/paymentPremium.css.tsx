import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    paperDiv: {
      marginTop: '30px'
    },
    flexContainer: {
      display: 'flex',
      justifyContent: 'space-around'
    },
    right: {
      backgroundColor: '#EFEEEE',
      width: '600px',
      display: 'flex',
      justifyContent: 'center'
    },
    input: {
      // backgroundColor: 'white',
      width: '400px',
      marginTop: '20px',
    },
    helperText: {
      fontSize: '1.2rem',
      marginLeft: '0',
    },
    inputField: {
      backgroundColor: 'white',
      width: '400px',
      fontSize: '1.5rem'
    },
    container: {
      width: '100%',
    },
    accordion: {
      fontSize: '1.5rem',
      border: `1px solid var(--ion-color-primary)`,

    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }),
);
