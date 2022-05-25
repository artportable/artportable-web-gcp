import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { rowGap, columnGap } from '../app/utils/styleUtils';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    zendeskForm: {
      marginTop: theme.spacing(4),
      width: '100%',
      // [theme.breakpoints.up('md')]: {
      //   width: '400px',
      // },
    },
    flexPaper: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    paperLeft: {
      padding: '0 20px',
      width: '50%',
    },
    paperRight: {
      padding: '30px 20px 0 20px',

    },
    headerTypo: {
      fontWeight: 600,
      marginBottom: '20px'
    },
    textBlock: {
      margin: '30px 0 30px 0'
    },
    icon: {
      marginRight: '10px',
      fontSize: '40px'
    },
    iconTextFlex: {
      display: 'flex',
      alignItems: 'center',
      ...columnGap(20),
    },
  }),
);