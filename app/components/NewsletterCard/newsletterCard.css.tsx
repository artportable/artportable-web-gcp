import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    newsletterContainer: {
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      textAlign: "center",
      marginTop: "20px",
      [theme.breakpoints.up("smPlus")]: {},
      [theme.breakpoints.up("md")]: {
        flexDirection: "column",
      },
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    divBackground: {},

    newsletterHeader: {
      fontWeight: 600,
      fontSize: "24px",
      color: "#000000",
      fontFamily: "Roboto",
      marginTop: 0,
      marginBottom: 0,
      padding: "4px 20px",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "40px",
      },
      [theme.breakpoints.up("md")]: {},
    },

    newsletterText: {
      fontSize: "20px",
      fontWeight: 400,
      color: "#000000",
      fontFamily: "Joan",
      marginTop: 0,
      padding: "10px 20px",
      [theme.breakpoints.up("smPlus")]: {
        marginBottom: "10px",
        fontWeight: 400,
      },
    },

    newsletterTextBottom: {
      padding: "20px",
      fontSize: "16px",
      fontWeight: 400,
      [theme.breakpoints.up("smPlus")]: {
        padding: "0px 60px 60px 60px",
      },
    },
    newsletterTextSucess: {
      padding: "20px",
      fontSize: "20px",
      fontWeight: 400,
      color: "green",
      fontFamily: "Joan",
      [theme.breakpoints.up("smPlus")]: {
        padding: "0px 60px 60px 60px",
      },
    },

    newsletterButton: {
      backgroundColor: "#000000",
      color: "#FFFFFF",
      maxWidth: "100px",
      width: "100%",
      [theme.breakpoints.up("smPlus")]: {
        maxWidth: "30px",
        width: "50px",
        fontSize: "20px",
      },
    },

    newsletterLabel: {
      fontWeight: 350,
      fontFamily: "Joan",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "18px",
      },
    },

    imageBox: {
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },
    },
  })
);
