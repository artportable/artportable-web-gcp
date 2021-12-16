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
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      margin: '0 0 30px 0',

      [theme.breakpoints.up('smPlus')]: {
        flexDirection: 'row',
        marginBottom: '3rem'
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
      },
    },
    right: {
      width: '900px',
      display: 'flex',
    },
    input: {
      display: 'flex',
      flexDirection: 'column',
      width: '240px',
      [theme.breakpoints.up('smPlus')]: {
        width: '600px',
      },
    },
    helperText: {
      position: 'relative',
      marginLeft: '0',
      color: 'var(--ion-color-danger)',
    },
    inputField: {
      backgroundColor: 'white',
      width: '240px',
      fontSize: '1.5rem',
      [theme.breakpoints.up('smPlus')]: {
        width: '600px',
      },
    },
    container: {
      width: '100%',
      marginTop: '15px',
    },
    accordion: {
      fontSize: '1.5rem',
      border: `1px solid #cfcfcf`,
    },
    paymentOptions: {
      width: '550px',
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
      [theme.breakpoints.up('smPlus')]: {
        fontSize: '1.2rem',
      },
    },
    swishFlex: {
      display: 'flex',

    },
    swish: {
      width: '200px',
      marginRight: '15px',
      [theme.breakpoints.up('smPlus')]: {
        margin: '0 0 15px 15px',
        width: '300px',
      },
    },
    swishLogo: {
      marginLeft: '12px',
      position: 'relative',
      top: '5px',
      [theme.breakpoints.up('smPlus')]: {
        marginLeft: '50px',
      },
    },
      paymentCards: {
        marginLeft: '-5px',
        position: 'relative',
        [theme.breakpoints.up('smPlus')]: {
          marginLeft: '25px',
        },
      },
    swishNumer: {
      letterSpacing: '3px',
      position: 'relative',
      left: '28px',
      marginBottom: '15px',
      [theme.breakpoints.up('smPlus')]: {
        marginBottom: '0px',
      },
    },
    phoneNumber: {
      backgroundColor: 'white',
      width: '300px',
      fontSize: '1.2rem',
      [theme.breakpoints.up('smPlus')]: {
      },
    },
    gap: {
      ...columnGap(theme.spacing(2)),
    },

    qrCode: {
      marginTop: '15px',
    },
    stripe: {
      margin: '0 0 15px 15px',
    },
    premiumText: {
      ...columnGap(theme.spacing(1)),
      margin: '0 15px',
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
    stepperContainer: {
      marginTop: '15px',
      width: '100%',
      [theme.breakpoints.up('smPlus')]: {
        marginLeft: '15px',
        marginTop: 0,
        width: '700px',
      },
    },
    buttonFlex: {
      display: 'flex',
      marginTop: '16px',
      [theme.breakpoints.up('smPlus')]: {
        width: '610px',
      },
    },
    buttonBack: {
      margin: '8px 8px 0 0',
    },
    buttonNext: {
      marginTop: '8px',
    },
    buttonNextStep1: {
      marginTop: '16px',
    },
    buttonNextStep2: {
      marginTop: '0',
      width: '301.08px',
    },
    buttonBackStep2: {
      margin: '0px 8px 0 0',
      width: '301.08px',
    },
    inputPaper: {
      marginTop: '16px',
    },
    successDiv: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
    },
    doneDiv: {
      display: 'flex',
      alignItems: 'center',
      margin: '15px 0',
    },
    confirmIcon: {
      display: 'none',
      color: 'var(--ion-color-success)',
      fontSize: '3rem',
    },
    successHeading: {
      fontSize: '1rem',
      marginTop: '15px',
      [theme.breakpoints.up('smPlus')]: {
        fontSize: '1.2rem',
      },
    },
    successHeading2: {
      fontSize: '1.2rem',
      marginTop: '15px',
      marginLeft: '40px',
    },
    accordionPaper: {
      borderRadius: '4px',
      padding: '24px 8px',
      [theme.breakpoints.up('smPlus')]: {
        padding: '24px'
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
