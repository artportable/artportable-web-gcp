import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    avatar: {
      backgroundColor: theme.palette.common.white,
      width: "60px",
      height: "60px",
    },
    text: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: "0px",
    },
    username: {
      textAlign:'center',
      fontWeight: 600,
      letterSpacing: "5px",
      fontSize: "18px",
    },
    button: {
      height: "25px",
      marginLeft:'20px',
      backgroundColor: "var(--yellow-darker)",
      color: "black",
      "&:hover": {
        transform: "scale(1.095)",
        color: "white",
        backgroundColor: "var(--yellow-darker)"
      },
    },
  }),
);