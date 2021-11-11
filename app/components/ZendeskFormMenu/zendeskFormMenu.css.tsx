import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
      maxWidth: '40rem',
      margin: 'auto'
    },
    form: {
      paddingTop: theme.spacing(2),
      '& > *': {
        marginBottom: theme.spacing(2.5)
      }
    },
    textField: {
      minHeight: '76px'
    },
    textFieldMultiline: {
      minHeight: '133px'
    },
    sendButton: {
      float: 'right'
    }
  }),
);
