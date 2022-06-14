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
      [theme.breakpoints.up('lg')]: {
        flexDirection: 'column',
        marginBottom: '3rem',
        gridTemplateColumns: 'auto auto auto',
      },
    },
    item: {
      padding: '1rem',
      position: 'relative',
      transition: "transform 0.15s ease-in-out",
      [theme.breakpoints.up('mdPlus')]: {
        padding: '1rem',
      },
    },
    paper: {
      height: '670px',
      position: 'relative',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      // transition: "transform 0.15s ease-in-out",
      "&:hover": { boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px',
      // transform: "scale3d(1.05, 1.05, 1)" 
    },
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
    logoArtportable: {
      width: '100%',
      marginTop: '15px',
      [theme.breakpoints.up('smPlus')]: {
        width: '320px',
      },
    },
    button: {
      position: 'absolute',
      width: '95%',
      display: 'block',
      bottom: '10px',
      marginLeft: '-2px',
      [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      width: '95%',
      display: 'block',
      bottom: '10px',
      },
    },
    // button2: {
    //   position: 'absolute',
    //   marginBottom: '20px',
    //   [theme.breakpoints.up('sm')]: {
    //     position: 'absolute',
    //   // bottom: '20px',
      
    //   bottom: '10px'
    //   },
    // },
    // button3: {
    //   position: 'relative',
    //   width: '400px',
    //   marginBottom: 120,
    //   [theme.breakpoints.up('sm')]: {
    //     position: 'relative',
    //   width: '400px',
    //   marginBottom: 50,
    //   },
    // },
    // button4: {
    //   marginTop: 125,
    //   [theme.breakpoints.up('sm')]: {
    //     marginTop: 115,
    //   },
    // },
    // button5: {
    //   marginTop: 124.5,
    //   [theme.breakpoints.up('sm')]: {
    //     marginTop: 115,
    //   },
    // },
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
