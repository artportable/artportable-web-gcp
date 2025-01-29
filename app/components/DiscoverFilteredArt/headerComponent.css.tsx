import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        backgroundColor: "rgba(0, 118, 213, 1)",
        color: "white",
        gridColumn: "1/4",
        padding: "20px",
        marginRight: "0",
        marginLeft: "auto",
        width: "100vw",
        alignItems: "center",
        height: "300px",
      },
    },

    containerLiked: {
      display: "none",
      [theme.breakpoints.up("smPlus")]: {
        display: "flex",
        backgroundColor: "#229059",
        color: "white",
        gridColumn: "1/4",
        padding: "20px",
        marginRight: "0",
        marginLeft: "auto",
        width: "100vw",
        alignItems: "center",
        height: "300px",
      },
    },
    titleWrapper: {
      fontSize: "34px",

      [theme.breakpoints.up("smPlus")]: {
        fontSize: "42px",
        fontWeight: "bold",
      },
    },
    titleWrapperTwo: {
      fontSize: "34px",
      display: "flex",
      textAlign: "center",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "46px",
        fontWeight: "bold",
      },
    },
    textWrapper: {
      display: "flex",
      textAlign: "center",
      [theme.breakpoints.up("smPlus")]: {
        width: "0%",
        display: "flex",
        fontSize: "16px",
      },
    },
  })
);
