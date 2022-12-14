import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--header-color)",
      height: "700px",
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
      },
      [theme.breakpoints.up("md")]: {
        width: "auto",
      },
    },

    headline: {
      fontFamily: "Gotham",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "48px",
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
          marginLeft: "5px",
        },
      },
    },

    description: {
      fontSize: "30px",
      [theme.breakpoints.up("sm")]: {},
      [theme.breakpoints.up("md")]: {},
      [theme.breakpoints.up("mdPlus")]: {},
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
      margin: "150px",
      [theme.breakpoints.down("xs")]: {
        margin: "0px 35px 0px 30px",
      },
      [theme.breakpoints.down("sm")]: {
        margin: "0px 35px 0px 30px",
      },
    },

    info: {
      backgroundColor: "var(--header-color)",
      "&:nth-of-type(odd)": {
        backgroundColor: "var(--absolute-white)",
      },
      display: "flex",
      justifyContent: "space-around",
      alignItems: "flex-end",
      padding: "10px 10px 10px 10px",
      fontWeight: 350,
      "& a": {
        textDecoration: "underline",
        "&:hover": {
          textDecoration: "none",
        },
      },
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "10px 0px 10px 0px",
      },
      [theme.breakpoints.up("md")]: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "0px 10px 0px 10px",
      },
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
      [theme.breakpoints.up("sm")]: {
        margin: "0px 0px 0px 0px",
        padding: "0px 0px 0px 0px",
      },

      [theme.breakpoints.up("md")]: {
        margin: "0px 0px 0px 0px",
        padding: "0px 0px 0px 0px",
      },
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

      [theme.breakpoints.up("md")]: {
        width: "100%",
        display: "flex",
        flexDirection: "column-reverse",
        marginBottom: "0px",
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
