import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "transparent",
      color: "black",
      gridColumn: "1/4",
      padding: "0px",

      [theme.breakpoints.up("smPlus")]: {
        backgroundColor: "#aa8a46",
        color: "white",
        marginRight: "0",
        marginLeft: "auto",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        height: "250px",
      },
    },
    titleWrapper: {
      fontSize: "22px",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "42px",
        fontWeight: "bold",
      },
    },
    titleWrapperTwo: {
      fontSize: "22px",
      display: "flex",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "46px",
        fontWeight: "bold",
      },
    },
    textWrapper: {
      display: "none",
      [theme.breakpoints.up("smPlus")]: {
        width: "80%",
        display: "flex",
        fontSize: "16px",
      },
    },
  })
);
