import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    pageContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    banner: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--header-color)",
      height: "754px",
      marginBottom: "115px",
      width: "100%",
      [theme.breakpoints.up("smPlus")]: {
        height: "400px",
        width: "100%",
      },
      [theme.breakpoints.up("mdPlus")]: {
        height: "400px",
      },
      [theme.breakpoints.up("lg")]: {
        display: "flex",
        width: "100%",
      },
    },
    textImgContainer: {
      display: "flex",
      width: "auto",
      flexDirection: "column-reverse",
      alignItems: "center",
      [theme.breakpoints.up("smPlus")]: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
      },
      [theme.breakpoints.up("md")]: {
        justifyContent: "space-between",
        width: "90%",
        margin: "10px 10px 10px 10px",
      },
      [theme.breakpoints.up("mdPlus")]: {
        justifyContent: "space-between",
        width: "90%",
        margin: "10px 10px 10px 10px",
      },
      [theme.breakpoints.up("lg")]: {
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
      },
    },

    headline: {
      fontFamily: "Gotham",
      fontStyle: "normal",
      fontWeight: 700,
      width: "100%",
      fontSize: "48px",
      lineHeight: "1",
      marginTop: "48px",
      marginBottom: "24px",
      [theme.breakpoints.up("sm")]: {
        width: "100%",
        fontSize: "38px",
      },
      [theme.breakpoints.up("md")]: {
        width: "100%",
        fontSize: "52px",
      },
      [theme.breakpoints.up("lg")]: {
        width: "100%",
        fontSize: "52px",
      },
    },
    heroText: {
      display: "flex",
      flexDirection: "column",
      width: "300px",
      "& a": {
        textDecoration: "underline",
        "&:hover": {
          textDecoration: "none",
        },
      },
      [theme.breakpoints.up("sm")]: {
        width: "400px",
      },
      [theme.breakpoints.up("md")]: {
        width: "650px",
        margin: "10px 20px 10px 10px",
        "& a": {
          textDecoration: "underline",
        },
      },
      [theme.breakpoints.up("lgPlus")]: {
        width: "600px",
      },
    },

    description: {
      fontSize: "20px",
      width: "100%",
      [theme.breakpoints.up("sm")]: {},
      [theme.breakpoints.up("md")]: {
        fontSize: "24px",
      },
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "24px",
      },
      [theme.breakpoints.up("lgPlus")]: {
        width: "800px",
      },
    },

    artwork: {
      width: "300px",
      height: "250px",
      [theme.breakpoints.up("sm")]: {
        width: "400px",
        height: "250px",
      },
      [theme.breakpoints.up("smPlus")]: {
        width: "300px",
        height: "250px",
      },
      [theme.breakpoints.up("md")]: {
        width: "400px",
        height: "250px",
      },
      [theme.breakpoints.up("lgPlus")]: {
        width: "500px",
        height: "400px",
      },
    },

    jobContainer: {
      [theme.breakpoints.up("xs")]: {
        margin: "0px 35px 0px 30px",
      },
      [theme.breakpoints.up("sm")]: {
        margin: "20px",
        width: "90%",
      },
    },

    jobInfoContainer: {
      backgroundColor: "var(--header-color)",
      "&:nth-of-type(odd)": {
        backgroundColor: "var(--absolute-white)",
      },
      display: "flex",
      "& a": {
        textDecoration: "underline",
        "&:hover": {
          textDecoration: "none",
        },
      },
      padding: "10px 10px 10px 10px",
      [theme.breakpoints.up("sm")]: {},
      [theme.breakpoints.up("md")]: {},
    },
    upperTextContainer: {
      display: "flex",
      flexDirection: "column-reverse",
      justifyContent: "space-between",
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
        alignItems: "baseline",
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        alignItems: "baseline",
      },
      "& a": {
        textDecoration: "underline",
        color: "green",
        "&:hover": {
          textDecoration: "none",
        },
      },
    },

    upperText: {
      //margin: "10px 0px 10px 0px",
      fontSize: "24px",
      fontFamily: "Gotham",
      fontWeight: 350,
    },

    jobs: {
      width: "100%",
    },

    jobName: {
      fontWeight: 500,
      fontFamily: "Gotham",
      textDecoration: "none",
    },

    apply: {
      textDecoration: "underline",
      [theme.breakpoints.up("md")]: {
        visibility: "hidden",
        flexDirection: "column",
      },
    },

    leftContainer: {
      display: "flex",
      flexDirection: "column-reverse",
      alignItems: "flex-end",
      "& a": {
        textDecoration: "underline",
        "&:hover": {
          textDecoration: "none",
        },
      },
      [theme.breakpoints.up("smPlus")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: "100%",
        display: "flex",
        flexDirection: "column-reverse",
      },
    },

    wrapperLeft: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
    },

    wrapperRight: {
      display: "flex",
      flexDirection: "column-reverse",
      alignItems: "flex-end",
      [theme.breakpoints.up("smPlus")]: {
        width: "100%",
        display: "flex",
        flexDirection: "column-reverse",
        justifyContent: "flex-end",
      },
    },

    applyUpper: {
      visibility: "hidden",
      [theme.breakpoints.up("md")]: {
        visibility: "visible",
      },
    },
  })
);
