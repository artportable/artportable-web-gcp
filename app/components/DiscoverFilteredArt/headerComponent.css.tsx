import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        backgroundColor: "#0176D5",
        color: "white",
        gridColumn: "1/4",
        padding: "20px",
        marginRight: "0",
        marginLeft: "auto",
        width: "100vw",
        alignItems: "center",
        height: "200px",
      },
    },

    containerLiked: {
      display: "none",
      [theme.breakpoints.up("smPlus")]: {
        display: "flex",
        backgroundColor: "#0176D5",
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
        fontSize: "35px",
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
