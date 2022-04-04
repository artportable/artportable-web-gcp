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
        height: '580px'
      },
    },
    title: {
      textAlign: 'center',
      marginTop: '20px',
    },
    thanksText: {
      '& h2': {
        fontWeight: 600,
        fontSize: '1.6rem',
      },
      textAlign: 'center',
      alignSelf: 'center',
      marginTop: '30px',
      fontWeight: 600,
    },
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      textAlign: 'center',
    },
    phoneDiv: {
      marginTop: '30px'
    },
    imgDivSecondView: {
      alignSelf: 'center',
      marginTop: '25px'
    },
    text: {
      fontSize: '1.14rem',
      margin: '30px 0 10px 0',
    },
    textPortfolioPremium: {
      // fontStyle: 'italic',
      fontWeight: 600,
      fontSize: '1.6rem',
    },
    logo: {
      alignSelf: 'center',
      marginTop: '30px',
      width: '50%',
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
    listItem: {
      marginTop: '5px',
    },
    textTextfield: {
      marginBottom: '5px',
      textAlign: 'left'
    },
    textFieldDiv: {
    },
    textField: {
      minHeight: "76px",
      "& label.Mui-focused": {
        color: "black",
      },
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused & fieldset": {
          // borderColor: 'black',
        },
        "&.Mui-focused fieldset": {
          border: "1px solid black",
        },
      },
    },
    [theme.breakpoints.up('sm')]: {
      dialog: {
        '& .MuiDialog-paper': {
          height: '570px'
        },
      },
    },
  }),
);
