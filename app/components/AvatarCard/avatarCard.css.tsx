import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px",
    },
    text: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: "0px",
    },
    username: {
      textAlign: "center",
      fontWeight: 600,
      letterSpacing: "5px",
      fontSize: "10px",
    },
    location: {
      fontSize: "14px",
      marginTop: "10px",
      textAlign: "center",
      textOverflow: "ellipsis",
      wordBreak: "break-word",
    },
    button: {
      height: "20px",

      backgroundColor: "var(--yellow-darker)",
      color: "black",
      fontSize: "10px",
      "&:hover": {
        transform: "scale(1.095)",
        color: "white",
        backgroundColor: "var(--yellow-darker)",
      },
    },
  })
);
