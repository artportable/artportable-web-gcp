import { Hidden } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      fontSize: '40px',
      fontWeight: 600,
    },

    container:{
      marginTop: '-40px',
      paddingTop: '60px',
      width: '100%',
      marginBottom: '10px',
      display: 'flex',
      flexDirection: 'column',
      // justifyContent: 'space-around',
      backgroundColor: 'var(--header-color)',
      gridColumn: '1/4',
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(4),
    },
    imageDiv: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginBottom: '10px',
    },
    image: {
      maxWidth: '90%',
      maxHeight: '400px',
      filter: 'drop-shadow(8px 8px 8px rgba(0, 0, 0, 0.4))'
    },
    textDiv: {
      display: 'flex',
      placeContent: 'center',
      marginBottom: '20px',
    },
    topDescription: {
      '& p': {
        '& span': {
        fontFamily: 'Gotham !important',
      },
    },
        fontFamily: 'Gotham',
      marginTop: '10px',
      paddingRight: theme.spacing(0),
        paddingLeft: theme.spacing(0),
    },
    description: {
      '& h2': {
        '& span': {
        fontFamily: 'Gotham !important',
        fontWeight: '600 !important',
      },
    },
      '& p': {
        '& span': {
        fontFamily: 'Gotham !important',
      },
    },
      marginTop: '-30px',
    },
    buttonDiv: {
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      marginTop: '20px',
    },
    accordion:{
      backgroundColor: 'var(--header-color)',
      width: '100%',
    },
    accordionDiv: {
      paddingRight: theme.spacing(0),
      marginTop: '15px',
    },
    [theme.breakpoints.up('smPlus')]:{
      text: {
        paddingRight: '50px',
        paddingLeft: '50px',
      },
    },
    [theme.breakpoints.up('md')]:{
      topDescription: {
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
      },
    },
    
    [theme.breakpoints.up('lg')]:{
      textDiv: {
        placeContent: 'flex-start'
      },
      container:{
        flexDirection: 'row-reverse',
        paddingRight: theme.spacing(6),
        paddingLeft: theme.spacing(6),
        justifyContent: 'center',
      },
      imageDiv: {
        alignSelf: 'unset',
      },
      image: {
        maxWidth: '500px',
        maxHeight: 'unset'
      },
      text: {
        paddingRight: '50px'
      },
      header: {
        marginTop: '-15px',
      },
      accordionDiv: {
        paddingRight: theme.spacing(12),
        maxWidth: '1000px',
        marginTop: '0px',
        alignSelf: 'center'
      },
      topDescription: {
        paddingRight: theme.spacing(0),
        paddingLeft: theme.spacing(0),
      },
    }
  }),
);