import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    newsletterContainer: {
      display: "flex",
      flexDirection: "column",
      maxHeight: "900px",
      height: "100%",
      width: "100%",
      border: "1px solid rgba(0, 0, 0, 0.5)",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "5px",
      [theme.breakpoints.up("smPlus")]: {
        maxHeight: "1100px",
        maxWidth: "900px",
      },
      [theme.breakpoints.up("md")]: {
        maxWidth: "fill-available",
        flexDirection: "row",
      },
    },

    divBackground: {
      backgroundColor: "#FFFFFF",
      width: "fit-content",
    },

    newsletterImg: {
      padding: "20px",
      width: "100%",
      [theme.breakpoints.up("smPlus")]: {
        padding: "60px",
        paddingBottom: "40px",
      },
      [theme.breakpoints.up("md")]: {
        padding: "50px",
        paddingRight: 0,
      },
    },

    newsletterHeader: {
      fontWeight: 600,
      fontSize: "24px",
      color: "#000000",
      fontFamily: "Gotham",
      marginTop: 0,
      marginBottom: 0,
      padding: "4px 20px",
      [theme.breakpoints.up("smPlus")]: {
        paddingLeft: "60px",
        paddingRight: "60px",
        fontSize: "32px",
      },
      [theme.breakpoints.up("md")]: {
        paddingTop: "50px",
        paddingBottom: "20px",
      },
    },

    newsletterText: {
      fontSize: "16px",
      fontWeight: 400,
      color: "#000000",
      marginTop: 0,
      padding: "10px 20px",
      [theme.breakpoints.up("smPlus")]: {
        paddingLeft: "60px",
        paddingRight: "60px",
        marginBottom: "10px",
        fontWeight: 450,
      },
    },

    newsletterTextBottom: {
      padding: "20px",
      fontSize: "14px",
      fontWeight: 400,
      [theme.breakpoints.up("smPlus")]: {
        padding: "0px 60px 60px 60px",
      },
    },

    newsletterButton: {
      backgroundColor: "#000000",
      color: "#FFFFFF",
      maxWidth: "140px",
      width: "100%",
      [theme.breakpoints.up("smPlus")]: {
        maxWidth: "230px",
        width: "100%",
        fontSize: "20px",
      },
    },

    newsletterLabel: {
      paddingLeft: "20px",
      fontWeight: 350,
      [theme.breakpoints.up("smPlus")]: {
        paddingLeft: "60px",
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
