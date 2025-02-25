import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    wrapper: {
      marginTop: "30px",
      width: "90%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
      margin: "0 auto",
      [theme.breakpoints.up("smPlus")]: {
        height: "100%",
      },
      [theme.breakpoints.up("md")]: {},
    },

    registerWrapper: {
      marginTop: "20px",
      backgroundColor: "#FCF7EC",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "265px",
      borderTop: "1px solid black",
      borderBottom: "1px solid black",
      borderColor: "#B3BB3",
      padding: "40px",
      [theme.breakpoints.up("smPlus")]: {
        padding: "0px",
      },
      [theme.breakpoints.up("md")]: {},
    },

    registerTitle: {
      fontSize: "20px",
      fontFamily: "Roboto",
      fontWeight: 600,
      textAlign: "center",
      [theme.breakpoints.up("md")]: {
        fontSize: "40px",
      },
    },
    registerText: {
      textAlign: "center",
      [theme.breakpoints.up("md")]: {
        textAlign: "start",
      },
    },

    buttonRegister: {
      marginTop: "10px",
      borderRadius: "40px",
      marginRight: "10px",
      padding: "10px 10px 10px 10px",
      fontSize: "12px",
      fontWeight: 600,
      fontFamily: "Roboto !important",
      backgroundColor: "#229059",
      color: "white",
      [theme.breakpoints.up("lg")]: {
        padding: "10px 20px 10px 20px",
        fontSize: "16px",
      },
      "&:hover": {
        backgroundColor: "#229059",

        textDecoration: "underline",
      },
    },

    leftItem: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
    },
    rightItem: {},
  })
);
