import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
      gap: '20px'
    },
    // wrapper: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   width: '400px',
    //   flexDirection: 'row',
    // },
    editorial: {
      marginBottom: theme.spacing(1)
    },
    headline: {
      textDecoration: 'underline',
      marginBottom: theme.spacing(1)
    },
    coverImage: {
      width: '100%',
      borderRadius: '5px',
    },
    dateSpan: {
      textAlign: 'left',
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
    }
  }),
);