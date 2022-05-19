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
    flex: {
      margin: '-100px 0 -10px 0',
      display: 'grid',
      gridTemplateColumns: '1fr',
      [theme.breakpoints.up('sm')]: {
        margin: '-100px 0 20px 0',
      },
      [theme.breakpoints.up('smPlus')]: {
        margin: '-140px 0 -20px 0',
      },
      [theme.breakpoints.up('md')]: {
        margin: '-170px 0 -40px 0',
      },
      [theme.breakpoints.up('mdPlus')]: {
        margin: '-250px 0 -130px 0',
      },
      [theme.breakpoints.up('lg')]: {
        margin: '-270px 0 -170px 0',
      },
      [theme.breakpoints.up('lgPlus')]: {
        margin: '-360px 0 -190px 0',
      },
    },
    staffDiv: {
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

    image: {
      width: '100%',
      aspectRatio: '1/1',
      objectFit: 'cover',
      backgroundColor: '#FAF3EE',
      marginBottom: '10px'
    },
    videoFrame: {
      width: '100%',
      aspectRatio: '1/1',
      objectFit: 'cover',
    },
    bold: {
      fontWeight: 500,
    },

  }),
);