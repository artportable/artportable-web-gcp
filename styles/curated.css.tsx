import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) => {
  return createStyles({
    container: {
      marginTop: "0px",
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("smPlus")]: {
        marginTop: "30px",
      },
    },
    title: {
      fontSize: "26px",
      textAlign: "center",
      fontFamily: "Roboto",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "40px",
        marginLeft: "10%",
        textAlign: "start",
      },
    },
    text: {
      fontSize: "13px",
      fontFamily: "Joan",
      width: "90%",
      margin: "0 auto",
      textAlign: "center",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "20px",
        marginLeft: "10%",
        textAlign: "start",
      },
    },
    textWrapper: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#FCF7EC",
      height: "150px",
      flexDirection: "column",
      gridColumn: "1 / 4",
      [theme.breakpoints.up("smPlus")]: {
        height: "250px",
      },
    },
    wrap: {
      width: "100%",
      marginTop: "10px",
      [theme.breakpoints.up("smPlus")]: {
        width: "90%",
      },
    },
  });
});
