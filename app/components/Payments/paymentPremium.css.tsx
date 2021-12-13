import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Height } from '@material-ui/icons';
import { columnGap, rowGap } from '../../utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    paperDiv: {
      marginTop: '30px',
      height: '90vh',
    },
    flexContainer: {
      display: 'flex',
      justifyContent: 'space-around'
    },
    right: {
      backgroundColor: '#F5F5F6',
      width: '600px',
      display: 'flex',
      justifyContent: 'center'
    },
    input: {
      // backgroundColor: 'white',
      width: '500px',
      marginTop: '20px',
      height: '90vh',
    },
    helperText: {
      fontSize: '1.2rem',
      marginLeft: '0',
      display: 'none'
    },
    inputField: {
      backgroundColor: 'white',
      width: '500px',
      fontSize: '1.5rem'
    },
    container: {
      width: '100%',
      marginTop: '15px'
    },
    accordion: {
      fontSize: '1.5rem',
      border: `1px solid #cfcfcf`,

    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    radioLabel: {
        fontSize: '1.2rem',
    },
    swishFlex: {
      display: 'flex'

    },
    swishNumber: {
      marginBottom: '15px',
      transition: 'width 10s, height 10s',
    },
    swishLogo: {
      marginLeft: '25px',
      position: 'relative',
      top: '5px'
    },
    phoneNumber: {
      backgroundColor: 'white',
      width: '300px',
      fontSize: '1.2rem',
      transition: 'width 10s, height 10s',
    },
    stripeFlex: {
      
    },
    s: {
      marginTop: '5px'
    },
    thirdDiv: {
      display: 'flex',
      width: '900px',
      backgroundColor: '#F5F5F6',
      borderRadius: '800px 0px 0px 800px',
      justifyContent: 'center',

    },
    thirdText: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      ...columnGap(theme.spacing(2)),
      
    },
    swishPhone: {
      alignSelf: 'center',
    },
  }),
);
