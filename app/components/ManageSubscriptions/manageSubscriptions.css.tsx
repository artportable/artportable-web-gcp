import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { columnGap, rowGap } from '../../utils/styleUtils'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
      maxWidth: '40rem',
      margin: 'auto',
    },
    form: {
      '& > *': {
        marginBottom: theme.spacing(2.5)
      },
      display: 'flex',
      justifyContent: 'center',
    },
    textField: {
      minHeight: '76px',
      '& label.Mui-focused': {
        color: 'black',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused & fieldset': {
          // borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
          border: '1px solid black',
        },
      },
    },
    textFieldMultiline: {
      minHeight: '133px',
      '& label.Mui-focused': {
        color: 'black',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused & fieldset': {
          // borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
          border: '1px solid black',
        },
      },
    },
    textFieldFlex: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',

    },
    sendButton: {
      marginTop: theme.spacing(1),
      alignSelf: 'flex-end',
      maxWidth: '90px'

    },
  }),
);
