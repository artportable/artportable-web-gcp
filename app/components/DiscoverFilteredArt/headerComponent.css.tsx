import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "rgba(0, 118, 213, 1)",
      color: "white",
      gridColumn: "1/4",
      padding: "20px",
      height: "250px",
      [theme.breakpoints.up("smPlus")]: {
        color: "white",
        marginRight: "0",
        marginLeft: "auto",
        padding: "20px",
        display: "flex",
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
