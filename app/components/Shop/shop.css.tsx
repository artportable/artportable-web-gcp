import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Height } from '@material-ui/icons';
import { columnGap, rowGap } from '../../utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginTop: '7rem',
      marginBottom: '3rem',
    },
    flexContainer: {
      display: 'grid',
      justifyContent: 'center',
      flexDirection: 'column',
      margin: '0 0 30px 0',
      [theme.breakpoints.up('mdPlus')]: {
        flexDirection: 'column',
        marginBottom: '3rem',
        gridTemplateColumns: 'auto auto auto',
      },
    },
    item: {
      padding: '1rem',
      transition: "transform 0.15s ease-in-out",
      [theme.breakpoints.up('mdPlus')]: {
        padding: '1rem',
      },
    },
    paper: {
      height: '670px',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      transition: "transform 0.15s ease-in-out",
      "&:hover": { boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px',
      transform: "scale3d(1.05, 1.05, 1)" },
      [theme.breakpoints.down('sm')]: {
        height: '670px',
      },
      [theme.breakpoints.down('xs')]: {
        height: '670px',
      },
    },
    left: {
      width: '100%',
      [theme.breakpoints.up('smPlus')]: {
        width: '400px',
      },
    },
    productImage: {
      width: '100%',
      [theme.breakpoints.up('smPlus')]: {
        width: '400px',
        height: '240px'
      },
    },
    premiumText: {
      ...columnGap(theme.spacing(1)),
      margin: '0 11px',
    },
    textIncluded: {
      marginTop: '15px',
    },
    textLastLine: {
      marginBottom: '15px',
    },
    logoArtportable: {
      width: '100%',
      marginTop: '15px',
      [theme.breakpoints.up('smPlus')]: {
        width: '320px',
      },
    },
    button: {
      marginTop: 38,
      [theme.breakpoints.down('sm')]: {
        marginTop: 30,
      },
    },
    button2: {
      marginTop: 124,
      [theme.breakpoints.down('sm')]: {
        marginTop: 115,
      },
    },
    button3: {
      marginTop: 68,
      [theme.breakpoints.down('sm')]: {
        marginTop: 60,
      },
    },
    button4: {
      marginTop: 125,
      [theme.breakpoints.down('sm')]: {
        marginTop: 115,
      },
    },
    button5: {
      marginTop: 124.5,
      [theme.breakpoints.down('sm')]: {
        marginTop: 115,
      },
    },
    footer: {
      display: 'none',
      position: 'absolute',
      left: '0',
      bottom: '0',
      width: '100%',
      marginTop: '200px',

      [theme.breakpoints.up('smPlus')]: {
        display: 'initial'
      },
    },
  }),
);
