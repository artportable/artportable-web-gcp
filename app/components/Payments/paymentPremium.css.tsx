import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Height } from '@material-ui/icons';
import { columnGap, rowGap } from '../../utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginTop: '7rem',
      marginBottom: '3rem'
    },
    flexContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    left: {
      width: '400px',
    },
    right: {
      width: '900px',
      display: 'flex',

    },
    input: {
      display: 'flex',
      flexDirection: 'column',
      width: '600px',
    },
    helperText: {
      position: 'relative',
      top: '-5px',
      marginLeft: '0',
      color: 'red'
    },
    inputField: {
      backgroundColor: 'white',
      width: '600px',
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
    swish: {
      margin: '0 0 15px 15px',

    },
    swishLogo: {
      marginLeft: '25px',
      position: 'relative',
      top: '5px'
    },
    swishNumer: {
      letterSpacing: '3px',
      position: 'relative',
      left: '28px',
    },
    phoneNumber: {
      backgroundColor: 'white',
      width: '300px',
      fontSize: '1.2rem',
    },
    gap: {
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
      marginLeft: '15px',
    },
    textIncluded: {
      marginTop: '15px',
    },
    textLastLine: {
      marginBottom: '15px',
    },
    logoArtportable: {
      marginTop: '15px',
    },
    stepperContainer: {
      marginLeft: '15px',
      width: '700px'
    },
    buttonFlex: {
      display: 'flex',
      width: '610px',
    },
    buttonBack: {
      margin: '8px 8px 0 0',
    },
    buttonNext: {
      marginTop: '8px',
    },
  }),
);
