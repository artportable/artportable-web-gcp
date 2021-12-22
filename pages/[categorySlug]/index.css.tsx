import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    // wrapper: {
    //   display: 'grid',
    //   gridTemplateColumns: 'repeat(3, 1fr)',
    //   gridTemplateRows: 'repeat(3, 1fr)',
    //   gap: '20px'
    // },
    flex: {
      alignItems: 'flex-start',
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      gap: '20px',
      flexWrap: 'wrap',

    },
    wrapper: {
      width: '300px',
      backgroundColor: 'white',
      [theme.breakpoints.up('sm')]: {
        width: '500px',
      },   
      // maxHeight: '600px'
      
    },
    editorial: {
      marginBottom: theme.spacing(1)
    },
    headline: {
      textDecoration: 'underline',
      marginBottom: theme.spacing(1)
    },
    coverImage: {
      width: '100%',

      borderRadius: '5px 5px 0 0',
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
    ap: {
      display: 'inline-block',
      width: 'fit-content',
    blockSize: 'fit-content',
    },
    hittad: {
      width: '1200px',
    },
    flezare: {
      display: 'flex'
    }
  }),
);