import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    pageContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    switchOrderContainer: {
      [theme.breakpoints.up("smPlus")]: {
        position: "absolute",
        right: "128px",
      },
      [theme.breakpoints.up("md")]: {
        right: "14%",
      },
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

    imageBorder: {
      borderStyle: "solid",
      filter: "drop-shadow(8px 8px 8px rgba(0, 0, 0, 0.4))",
      background: "#F5F5F5",
      borderColor: "#1F1E1E #292828 #292828 #272626",
      borderWidth: "10px",
      padding: "15px 15px 10px 15px",
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
      [theme.breakpoints.up("smPlus")]: {
        width: "100%",
        fontSize: "48px",
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
      boxShadow: "0 -1px 1px rgb(0 0 0 / 10%), 0 1px 1px 1px rgb(255 255 255 / 70%)",
      borderColor: "#BBBAB4 #C7C7BF #E5E4DF #C7C7BF",
      borderStyle: "solid",
      borderWidth: "2px",
      [theme.breakpoints.up("sm")]: {
        width: "400px",
      },
      [theme.breakpoints.up("smPlus")]: {
        width: "300px",
      },
      [theme.breakpoints.up("md")]: {
        width: "400px",
      },
      [theme.breakpoints.up("lgPlus")]: {
        width: "500px",
      },
    },

    jobContainer: {
      [theme.breakpoints.up("xs")]: {
        margin: "0px 42px",
      },
      [theme.breakpoints.up("sm")]: {
        margin: "20px",
        width: "90%",
      },
      [theme.breakpoints.up("smPlus")]: {
        width: "75%",
      },
    },

    jobInfoContainer: {
      backgroundColor: "var(--header-color)",
      "&:nth-of-type(odd)": {
        backgroundColor: "var(--absolute-white)",
      },
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      lineHeight: "32px",
      fontSize: "16px",
      "& a": {
        textDecoration: "underline",
        fontSize: "16px",
        "&:hover": {
          textDecoration: "none",
        },
      },
      padding: "25px",
      [theme.breakpoints.up("smPlus")]: {
        padding: "18px 25px",
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "column",
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
      //margin: "10px 0px 10px 0px",
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
      textDecoration: "underline",
    },

    apply: {
      textDecoration: "underline",
      [theme.breakpoints.up("md")]: {},
    },

    publish: {
      textDecoration: "underline",
      [theme.breakpoints.up("md")]: {},
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
      justifyContent: "space-between",
      alignItems: "flex-start",
      width: "70%",
    },

    wrapperRight: {
      position: "absolute",
      right: "60px",
      [theme.breakpoints.up("smPlus")]: {
        right: "128px",
        marginTop: "56px",
      },
      [theme.breakpoints.up("md")]: {
        right: "14%",
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
