import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    dialog: {
      '& .MuiDialog-paper': {
        width: '600%',
        height: '550px'
      },
    },
    title: {
      '& h2': {
        fontWeight: 600,
        fontSize: '1.6rem',
      },
      textAlign: 'center',
      alignSelf: 'center',
      marginTop: theme.spacing(6),
      fontWeight: 600,
    },
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      textAlign: 'center',
    },
    imgDiv: {
      alignSelf: 'center'
    },
    imgDivSecondView: {
      alignSelf: 'center',
      marginTop: '25px'
    },
    text: {
      fontSize: '1.14rem',
    },
    textSendPurchase: {
      // fontStyle: 'italic',
      fontWeight: 500,
      fontSize: '1.14rem',
    },
    emblem: {
      width: '150px',
      height: '150px',
      color: '#FFD700',
    },
    button: {
      alignSelf: 'flex-end',
      marginBottom: '20px'
    },
    [theme.breakpoints.up('sm')]: {
      dialog: {
        '& .MuiDialog-paper': {
          height: '500px'
        },
      },
    },
  }),
);
