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
        height: "600px",
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
        maxWidth: "400px",
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: "100%",
        maxWidth: "716px",
        margin: "10px 20px 10px 10px",
        "& a": {
          textDecoration: "underline",
        },
      },
      [theme.breakpoints.up("lgPlus")]: {
        width: "100%",
        maxWidth: "716px",
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
        width: "100%",
        maxWidth: "450px",
      },
      [theme.breakpoints.up("smPlus")]: {
        maxWidth: "600px",
      },
      [theme.breakpoints.up("md")]: {
        maxWidth: "800px",
      },
      [theme.breakpoints.up("lg")]: {
        maxWidth: "1000px",
      },
    },

    jobInfoContainer: {
      backgroundColor: "var(--header-color)",
      "&:nth-of-type(odd)": {
        backgroundColor: "var(--absolute-white)",
      },
      maxWidth: "700px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      lineHeight: "32px",
      fontSize: "16px",
      width: "100%",
      "& a": {
        textDecoration: "underline",
        fontSize: "16px",
        "&:hover": {
          textDecoration: "none",
        },
      },
      padding: "25px",
      [theme.breakpoints.up("smPlus")]: {
        "& :nth-child(1)": { order: 0 },
        "& :nth-child(2)": { order: 10 },
        "& :nth-child(3)": { order: 4, width: "100%" },
        "& :nth-child(4)": { order: 5 },
        "& :nth-child(5)": { order: 6 },
        "& :nth-child(6)": { order: 3, width: "100%", maxWidth: "max-content" },
        padding: "18px 25px",
        maxWidth: "900px",
      },
      [theme.breakpoints.up("md")]: {
        maxWidth: "inherit",
      },
    },

    jobCity: {
      width: "100%",
    },

    jobCompany: {
      width: "100%",
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
      width: "100%",
      maxWidth: "max-content",
      [theme.breakpoints.up("smPlus")]: {
        //order: 10,
      },
      [theme.breakpoints.up("md")]: {
        
      },
    },
  })
);
