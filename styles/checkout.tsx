import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BorderBottomSharp } from "@material-ui/icons";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "var(--yellow-lemon)",
      [theme.breakpoints.up("md")]: {
        backgroundColor: "var(--background-color)",
      },
      height: "100%",
      display: "flex",
    },
    left: {
      backgroundColor: "var(--yellow-lemon)",
      height: "100%",
      width: "100%",
      display: "none",
      justifyContent: "center",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    right: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        justifyContent: "center",
      },
    },
    fillInText: {
      fontWeight: 500,
      marginBottom: "10px",
    },
    leftContent: {
      display: "flex",
    },
    headlineDiv: {
      width: "500px",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start", // Align items to the start of the flex-direction column
    },

    headline: {
      fontWeight: 600,
      fontSize: "0.8rem",

      margin: "0 16px",
      [theme.breakpoints.up("sm")]: {
        fontSize: "2.5rem",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "2.5rem",
      },
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "3.5",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "3.5",
      },
    },
    headlineText: {
      fontSize: "0.8rem",
      margin: "0 16px",
      [theme.breakpoints.up("sm")]: {
        fontSize: "2.5rem",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "1.5rem",
      },
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "3.5",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "3.5",
      },
    },
    headlineMobile: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    headlineDivMobile: {
      width: "300px",
      margin: "40px 0",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    card: {
      width: "90%",
      height: "auto",
      margin: "0 16px",
      display: "flex",
      flexDirection: "column",

      [theme.breakpoints.up("sm")]: {
        width: "25rem",
      },
      "& .MuiCardContent-root > *:not(:last-child)": {
        marginBottom: "8px",
      },
      [theme.breakpoints.up("md")]: {
        width: "35rem",
      },
    },
    cardContentWidth: {
      width: "100%",
    },
    subtotal: {
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "solid 1px " + theme.palette.primary.main,
      marginBottom: "20px",
    },
    product: {
      display: "flex",
      justifyContent: "space-between",
    },
    logo: {
      marginTop: "30px",
      width: "150px",
      marginBottom: "16px",
      alignSelf: "center",
    },
    stripe: {
      width: "300px",
    },
  })
);
