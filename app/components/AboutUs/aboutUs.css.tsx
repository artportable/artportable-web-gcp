import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { columnGap, rowGap } from '../../utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: '-60px',
      [theme.breakpoints.up('md')]: {
        marginTop: '0',
      },
    },
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
    subHeaderTypo: {
      marginBottom: '30px'
    },

    staffDiv: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      ...rowGap(8),
      marginTop: '50px',
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '1fr 1fr',
        marginTop: '100px',
      },
      [theme.breakpoints.up('mdPlus')]: {
        gridTemplateColumns: '1fr 1fr 1fr',
        marginTop: '120px',
      },

    },
    wrapper: {
      marginBottom: '20px',
    },

    image: {
      width: '100%',
      aspectRatio: '1/1',
      objectFit: 'cover',
      backgroundColor: '#FAF3EE',
      marginBottom: '10px'
    },

    flex: {
      display: 'flex',
      justifyContent: 'center',
    },
    bottomDiv: {
      marginBottom: '40px',
      [theme.breakpoints.up('smPlus')]: {
        marginBottom: '80px',
      },
    },
    videoFrame: {
      width: '350px',
      height: '196.58px',
      [theme.breakpoints.up('sm')]: {
        width: '400px',
        height: '225px',
      },
      [theme.breakpoints.up('smPlus')]: {
        width: '500px',
        height: '281.25px',
      },
      [theme.breakpoints.up('md')]: {
        width: '600px',
        height: '337.5px',
      },
      [theme.breakpoints.up('mdPlus')]: {
        width: '800px',
        height: '449.33px',
      },
      [theme.breakpoints.up('lg')]: {
        width: '1000px',
        height: '561.67px',
      },
      [theme.breakpoints.up('lgPlus')]: {
        width: '1200px',
        height: '674px',
      },
    },
    bold: {
      fontWeight: 500,
    },
  }),
);