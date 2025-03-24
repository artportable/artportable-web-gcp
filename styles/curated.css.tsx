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
      marginTop: "10px",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "35px",
        textAlign: "start",
        marginTop: "0px",
        marginBottom: "0px",
      },
    },
    text: {
      fontSize: "13px",
      fontFamily: "Joan",
      margin: "0 auto",
      textAlign: "center",
      color: "rgb(0 0 0 / 47%)",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "20px",
        textAlign: "start",
      },
    },
    textWrapper: {
      display: "flex",
      backgroundColor: "#FCF7EC",
      height: "200px",
      marginBottom: "20px",
      [theme.breakpoints.up("smPlus")]: {
        display: "flex",
        backgroundColor: "#FCF7EC",
        color: "black",
        gridColumn: "1/4",
        padding: "20px",
        marginRight: "0",
        marginLeft: "auto",
        width: "100vw",
        alignItems: "center",
        height: "300px",
      },
    },
    wrap: {
      width: "90%",
      margin: "0 auto",
      [theme.breakpoints.up("smPlus")]: {
        width: "80%",
        margin: "0 auto",
      },
    },
  });
});
