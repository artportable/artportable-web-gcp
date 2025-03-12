import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      margin: "0 auto",

      [theme.breakpoints.up("smPlus")]: {
        height: "100%",
        flexDirection: "row",
      },
    },
    wrapper: {
      width: "100%",

      [theme.breakpoints.up("smPlus")]: {
        width: "50%",
        margin: "10px",
      },
    },

    titles: {
      marginBottom: "20px",
      fontSize: "12px",
      [theme.breakpoints.up("smPlus")]: {
        width: "80%",
      },
    },

    title: {
      fontFamily: "Roboto",
      color: "black",
      fontSize: "20px",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "32px",
      },
    },
    titleTwo: {
      fontFamily: "Roboto",
      color: "black",
      fontSize: "20px",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "22px",
      },
    },

    wrapperTwo: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "22px",
        flexDirection: "row",
        width: "50%",
      },
    },
  })
);
