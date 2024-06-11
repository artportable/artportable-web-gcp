import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fbf7f4",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
      },
    },

    image: {
      width: "400px",
      [theme.breakpoints.up("smPlus")]: {
        width: "300px",
      },
    },
    textButtonWrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.up("smPlus")]: {
        alignItems: "flex-start",
      },
    },
    button: {
      backgroundColor: "black",
      color: "white",
      borderRadius: "20px",
      marginTop: "20px",
      width: "140px",
      "&:hover": {
        transform: "scale(1.025)",
        backgroundColor: "black",
      },
    },
  })
);
