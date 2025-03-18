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
        marginLeft: "10px",
        fontSize: "40px",
        textAlign: "start",
      },
    },
    text: {
      fontSize: "13px",
      fontFamily: "Joan",
      margin: "0 auto",
      textAlign: "center",
      color: "rgb(0 0 0 / 47%)",
      [theme.breakpoints.up("smPlus")]: {
        marginLeft: "10px",
        fontSize: "20px",
        textAlign: "start",
      },
    },
    textWrapper: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#FCF7EC",
      height: "180px",
      flexDirection: "column",
      gridColumn: "1 / 4",
      marginBottom: "20px",
      [theme.breakpoints.up("smPlus")]: {
        height: "250px",
      },
    },
    wrap: {
      width: "90%",
      marginTop: "10px",
      margin: "0 auto",
      [theme.breakpoints.up("smPlus")]: {
        width: "80%",
        margin: "0 auto",
      },
    },
  });
});
