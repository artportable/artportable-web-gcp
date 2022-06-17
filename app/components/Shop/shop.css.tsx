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
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'auto auto',
      },
      [theme.breakpoints.up('lg')]: {
        
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
      position: 'relative',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      "&:hover": { 
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px',
      },
      [theme.breakpoints.up('md')]: {
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
    buttonFlex: {
      display: 'flex',
      justifyContent: 'center'
    },
    button: {
      position: 'relative',
      display: 'block',
      width: '35%',
      bottom: '20px',
      marginLeft: '-2px',
      marginTop: '30px',
      [theme.breakpoints.up('md')]: {
      position: 'absolute',
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
