import { Hidden } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
export const styles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      fontSize: '31px',
      fontWeight: 600,
      lineHeight: '32px'
    },
    container: {
      marginTop: '-40px',
      paddingTop: '60px',
      width: '100%',
      marginBottom: '10px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--header-color)',
      gridColumn: '1/4',
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(4),
    },
    imageDiv: {
      display: 'flex',
      textAlign: 'center',
      marginBottom: '10px',
      flexDirection: 'column',
      alignItems: 'flex-end',
      placeSelf: 'center',
      margin: '0 16px 0 16px'
    },
    aLink: {
      display: 'flex',
    },
    frames: {
      display: 'flex',
    },
    frame: {
      listStyle: 'none',
      listStyleType: 'none',
      margin: '0px',
      textAlign: 'center',
      display: 'inline-block',
      padding: '15px 15px 10px 15px',
      borderWidth: '10px',
      borderStyle: 'solid',
      borderColor: '#1F1E1E #292828 #292828 #272626',
      background: '#F5F5F5',
      [theme.breakpoints.up('smPlus')]: {
        borderWidth: '20px',
        padding: '40px 40px 35px 40px',
      },
      backgroundImage: 'linear-gradient(#FFFEF8, #F3F3F1)',
      filter: 'drop-shadow(8px 8px 8px rgba(0, 0, 0, 0.4))',
      position: 'relative',
      overflow: 'hidden',
      '& :before': {
        content: '""',
        position: 'absolute',
        top: '-175px',
        right: '-20%',
        width: '400px',
        height: '400px',
        transform: 'rotateZ(-40deg)',
        backgroundImage: 'linear-gradient(rgba(255,255,255,.4), rgba(255,255,255,0))',
      },
    },
    businessImage: {
      maxWidth: '100%',
      marginBottom: "14px"
    },
    image: {
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: '#BBBAB4 #C7C7BF #E5E4DF #C7C7BF',
      boxShadow: '0 -1px 1px rgba(0,0,0,.1), 0 1px 1px 1px rgba(255,255,255,.7)',
      maxWidth: '100%',
    },
    createdBy: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '15px',
    },
    chip: {
      backgroundColor: theme.palette.common.white
    },
    textDiv: {
      display: 'flex',
      placeContent: 'center',
      marginBottom: '20px',
    },
    flexDescription: {
      display: 'flex',
      justifyContent: 'flex-end'
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
    accordion: {
      backgroundColor: 'var(--header-color)',
      width: '100%',
    },
    accordionDiv: {
      paddingRight: theme.spacing(0),
      marginTop: '15px',
    },
    [theme.breakpoints.up('smPlus')]: {
      text: {
        paddingRight: '50px',
        paddingLeft: '50px',
      },
    },
    [theme.breakpoints.up('sm')]: {
      header: {
      fontSize: '44px',
      lineHeight: '43px'
      }
    },
    [theme.breakpoints.up('md')]: {
      businessImage: {
        marginBottom: "24px"
      },
      topDescription: {
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
      },
    },
    [theme.breakpoints.up('lg')]: {
      textDiv: {
        placeContent: 'flex-start'
      },
      container: {
        flexDirection: 'row-reverse',
        paddingRight: theme.spacing(6),
        paddingLeft: theme.spacing(6),
        justifyContent: 'center',
      },
      imageDiv: {
        alignSelf: 'flex-start',
        margin: '0'
      },
      image: {
        maxWidth: '500px',
        maxHeight: 'unset'
      },
      createdBy: {
        marginRight: '0',
        maxWidth: 'unset',
      },
      text: {
        paddingRight: '50px'
      },
      header: {
        marginTop: '-15px',
        fontSize: '65px',
        textAlign: 'right',
        lineHeight: '63px'

      },
      accordionDiv: {
        maxWidth: '1000px',
        marginTop: '0px',
        alignSelf: 'center',
        paddingRight: '30px'
      },
      topDescription: {
        paddingRight: theme.spacing(0),
        paddingLeft: theme.spacing(0),
      },
    }
  }),
);

