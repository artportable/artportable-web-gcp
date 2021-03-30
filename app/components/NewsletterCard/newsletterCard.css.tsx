import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      backgroundColor: theme.palette.secondary.main,
    },
    cardText: {
      color: '#ffffff',
      fontFamily: 'LyonDisplay',
      textDecoration: 'underline',
      marginBottom: theme.spacing(8)
    },
    textField: {
      '&:after': {
        borderBottomColor: '#ffffff',
      }
    },
    button: {
      borderColor: '#ffffff5f',
      color: '#ffffff',
      '&.MuiButton-root:hover': {
        borderColor: '#ffffffff'
      },
      marginLeft: 'auto'
    },
    unsubscribeText: {
      color: "#ffffff",
    }
  }),
);
