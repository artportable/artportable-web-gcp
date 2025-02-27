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
      backgroundColor: "#FCF7EC",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      borderTop: "1px solid black",
      borderBottom: "1px solid black",
      borderColor: "#B3BB3",
      padding: "40px",
      [theme.breakpoints.up("smPlus")]: {
        padding: "0px",
        height: "265px",
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
      fontSize: "16px",
      fontFamily: "Joan",
      fontWeight: 400,
      width: "100%",
      [theme.breakpoints.up("md")]: {
        textAlign: "center",
        fontSize: "20px",
        width: "50%",
      },
    },
    LogoBonnier: {
      height: "46px",
      width: "125px",
      [theme.breakpoints.up("smPlus")]: {
        height: "auto",
        width: "250px",
      },
    },
    LogoEgmont: {
      height: "46px",
      width: "125px",
      [theme.breakpoints.up("smPlus")]: {
        height: "156px",
        width: "auto",
      },
    },
    LogoTwo: {
      height: "46px",
      width: "125px",
      [theme.breakpoints.up("smPlus")]: {
        height: "156px",
        width: "360px",
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
    whatIs: {
      fontSize: "20px",
      fontFamily: "Roboto",
      fontWeight: 600,
      textAlign: "center",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "40px",
        textAlign: "start",
      },
    },

    whatIsText: {
      fontSize: "16px",
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
  })
);
