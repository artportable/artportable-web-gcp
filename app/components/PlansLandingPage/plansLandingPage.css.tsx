import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { rowGap, columnGap } from '../../utils/styleUtils';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifySelf: 'center',
      justifyContent: 'space-around',
      marginBlockStart: '15px',
      ...columnGap(theme.spacing(4)),
      
    },
    free: {
      '& h1, p, button':{
        marginInlineStart: "15px",
        marginInlineEnd: '15px'
       },
      backgroundColor: "white",
      border: '3px solid #FB7A83',
      boxSizing: 'border-box',
      borderRadius: '10px',
      maxWidth: '350px',
      height: '290px',
      transition: 'transform .2s',
      '&:hover': {
        transform: 'scale(1.1)'
      }
    },
    artist: {
      '& h1, p, button ':{
        marginInlineStart: "15px",
        marginInlineEnd: '15px'
       },
      backgroundColor: "white",
      border: '3px solid #FB7A83',
      boxSizing: 'border-box',
      borderRadius: '10px',
      maxWidth: '350px',
      height: '270px',
      lineBreak: 'normal',
      transition: 'transform .2s',
    },

    signUp: {
      color: "white",
      fontSize: "1rem",
      marginBottom: "15px",
      marginInlineStart: "15px", 
      width: '180px',
      height: '40px'
    },
    [theme.breakpoints.up('md')]: {
      container: {
        flexDirection: 'row',
        ...rowGap(theme.spacing(4)),
        },
        free: {
          maxWidth: '460px',
            height: '270px',
      },
        artist: {
          maxWidth: '460px',
          height: '270px',
      },
      signUp: {
        width: '200px',
        height: '40px'
      },

    },
    [theme.breakpoints.up('mdPlus')]: {

        free: {
            height: '230px',
            '&:hover': {
              transform: 'scale(1.1)'
            },
      },
        artist: {
          height: '230px',
          '&:hover': {
            transform: 'scale(1.1)'
          },
      },
      signUp: {
        width: '200px',
        height: '40px'
      },
      row: {
        display: 'flex',
        alignItems: 'end'
  
      },
    },
  }),
);
