import { makeStyles, createStyles } from "@material-ui/core/styles";
import { theme } from "../../../styles/theme";

export const styles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
    },
    yearsRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      overflow: "visible",
      marginRight: "5px",
    },
    years: {
      marginBottom: "2px",
      fontStyle: "italic",
      color: "grey",
    },
    displayNone: {
      display: "none",
    },

    title: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "30px",
      fontSize: "14px",
      fontWeight: "bold",
      [theme.breakpoints.up("md")]: {
        fontSize: "20px",
      },
    },
    frame: {
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      marginBottom: "30px",
      borderRadius: "5px",
      textAlign: "center",
      backgroundColor: "#faf3ee",
      borderWidth: "2px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",

      width: "100%",
      alignItems: "center",
    },

    frameDexter: {

    },
  })
);
