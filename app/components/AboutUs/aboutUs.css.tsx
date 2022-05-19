import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { columnGap, rowGap } from '../../utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    headerDiv: {
      margin: '100px 0 100px 0',
      [theme.breakpoints.up('md')]: {
        width: '70vw',
        },
        [theme.breakpoints.up('lg')]: {
          width: '50vw',
          },
    },
    headerTypo: {
      fontWeight: 600,
      marginBottom: '20px'
    },
    flex: {
      display: 'flex',
      justifyContent: 'center',
    },
    container: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '1fr 1fr',
        },
      [theme.breakpoints.up('mdPlus')]: {
      gridTemplateColumns: '1fr 1fr 1fr',
      },
      ...rowGap(8),

    },
    wrapper: {
      marginBottom: '40px',
    },

    linebreak: {
      width: '100%',
      height: '200px'
    },
   image: {
     width: '100%',
     aspectRatio: '1/1',
     objectFit: 'cover',
    backgroundColor: '#FAF3EE',
    marginBottom: '10px'
   },
   bold: {
     fontWeight: 500,
   },

  }),
);