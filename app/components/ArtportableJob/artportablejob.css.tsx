import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--header-color)",
      height: "500px",
      marginBottom: "30px",
      [theme.breakpoints.up("smPlus")]: {
        height: "400px",
        width: "100%",
      },
      [theme.breakpoints.up("mdPlus")]: {
        height: "400px",
      },
    },
    textImgContainer: {
      display: "flex",
      width: "auto",
      flexDirection: "column-reverse",
      alignItems: "center",
      [theme.breakpoints.up("smPlus")]: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
      },
      [theme.breakpoints.up("md")]: {
        width: "90%",
      },
    },

    headline: {
      fontFamily: "Gotham",
      fontStyle: "normal",
      fontWeight: 700,
      width: "100%",
      fontSize: "32px",
      lineHeight: "1",
      marginTop: "20px",
      marginBottom: "10px",
      [theme.breakpoints.up("sm")]: {},
      [theme.breakpoints.up("md")]: {},
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
        width: "450px",
      },
      [theme.breakpoints.up("md")]: {
        width: "650px",
        margin: "10px 20px 10px 10px",
        "& a": {
          textDecoration: "underline",
        },
      },
    },

    description: {
      fontSize: "18px",
      width: "100%",
      [theme.breakpoints.up("sm")]: {},
      [theme.breakpoints.up("md")]: {
        fontSize: "24px",
      },
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "24px",
      },
    },

    artwork: {
      width: "300px",
      height: "250px",
      [theme.breakpoints.up("smPlus")]: {},
      [theme.breakpoints.up("mdPlus")]: {
        display: "flex",
        height: "250px",
        width: "400px",
      },
    },

    jobContainer: {
      [theme.breakpoints.up("xs")]: {
        margin: "0px 35px 0px 30px",
      },
      [theme.breakpoints.up("sm")]: {
        margin: "60px",
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
      margin: "10px 0px 10px 0px",
      fontSize: "24px",
      fontFamily: "Gotham",
      fontWeight: 350,
    },

    jobs: {
      width: "100%",
    },

    jobName: {
      fontWeight: 450,
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
