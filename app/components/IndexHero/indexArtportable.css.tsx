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
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
      margin: "0 auto",
      [theme.breakpoints.up("smPlus")]: {
        height: "100%",
        flexDirection: "row",
      },
      [theme.breakpoints.up("md")]: {},
    },

    registerWrapper: {
      marginTop: "20px",
      backgroundColor: "#222222",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      color: "white",
      borderColor: "#B3BB3",
      padding: "20px",
      [theme.breakpoints.up("smPlus")]: {
        padding: "0px",
        height: "300px",
      },
      [theme.breakpoints.up("md")]: {},
    },

    registerTitle: {
      fontSize: "26px",
      fontFamily: "Roboto",
      fontWeight: 400,
      textAlign: "center",
      [theme.breakpoints.up("md")]: {
        fontSize: "40px",
        textAlign: "start",
      },
    },
    registerText: {
      textAlign: "center",
      fontSize: "13px",
      fontFamily: "Joan",
      fontWeight: 400,
      width: "100%",
      lineHeight: "20px",
      marginBottom: "20px",

      [theme.breakpoints.up("md")]: {
        textAlign: "center",
        fontSize: "20px",
        width: "50%",
        lineHeight: "30px",
      },
    },
    LogoBonnier: {
      height: "auto",
      width: "125px",
      [theme.breakpoints.up("smPlus")]: {
        height: "auto",
        width: "250px",
      },
    },
    LogoEgmont: {
      height: "auto",
      width: "125px",
      [theme.breakpoints.up("smPlus")]: {
        height: "156px",
        width: "auto",
      },
    },
    LogoTwo: {
      height: "auto",
      width: "125px",
      [theme.breakpoints.up("smPlus")]: {
        height: "156px",
        width: "360px",
      },
    },
    buttonRegister: {
      borderRadius: "30px",
      fontWeight: 500,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "white",
      border: "1px solid black",
      color: "black",
      width: "150px",
      height: "40px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      marginTop: "30px",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "14px",
      },
    },
    whatIs: {
      fontSize: "26px",
      fontFamily: "Roboto",
      fontWeight: 400,
      textAlign: "center",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "40px",
        textAlign: "start",
      },
    },

    whatIsText: {
      fontSize: "13px",
      fontFamily: "Joan",
      fontWeight: 400,
      textAlign: "center",
      lineHeight: "30px",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "20px",
        textAlign: "start",
      },
    },

    leftItem: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "10px",
      [theme.breakpoints.up("smPlus")]: {
        padding: "0px",
        width: "50%",
        alignItems: "start",
      },
    },
    rightItem: {},
    partnersWrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "260px",
      borderBottom: "1px solid black",
      width: "90%",
      alignItems: "center",
      [theme.breakpoints.up("smPlus")]: {
        height: "360px",
        justifyContent: "center",
        alignItems: "flex-start",
      },
    },
    partners: {
      fontSize: "26px",
      fontFamily: "Roboto",
      fontWeight: 400,
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "40px",
      },
    },
  })
);
