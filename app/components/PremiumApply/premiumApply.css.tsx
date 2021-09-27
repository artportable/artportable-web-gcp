import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { rowGap, columnGap } from '../../utils/styleUtils';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      height: '630px',
    },
    
    artImage: {
      display: 'none'
    },

    rightContainer: {
      display: 'flex',
      flexDirection: 'column',
      margin: '20px',
      width: '100%', 
    },
    contentCenter: {
      width: '100%',
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
    },

    flexRow: {
      display: 'flex',
      ...rowGap(8),
    },

    textRight: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },

    logoDiv: {
      display: 'flex',
      justifyContent: 'center',
    },
          
    logo: {
      width: '18rem',
      margin: '3rem 2rem' ,
    },

    textFlex: {
      display: "flex",
      height: '180px',
      textAlign: 'center',
      flexDirection: 'column',
      marginTop: '-32px',
      marginBottom: theme.spacing(8),
      ...columnGap(16)
    },
    header: {
      fontWeight: theme.typography.fontWeightBold,
    },
    text: {
      textAlign: 'left',
      marginBottom: theme.spacing(),
    },

    backButton: {
      marginRight: theme.spacing(1),
    },

    button: {
      marginBottom: 'auto',
      alignSelf: 'flex-end',
      textAlign: 'right',
      marginTop: 'auto',
      position: 'relative',
      bottom: '-150px',
    },

    [theme.breakpoints.up('sm')]: {
      container: {
        minHeight: 'initial',
      },
    },

    [theme.breakpoints.up('md')]: {
      container: {
        minHeight: 'initial',
        justifyContent: 'center',
      },
      artImage: {
        display: 'initial',
        width: '500px'
      }, 
      text: {
        maxWidth: '350px',
      },
    },
  })
);