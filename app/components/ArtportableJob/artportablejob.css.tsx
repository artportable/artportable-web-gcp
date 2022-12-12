import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--header-color)",
      height: "600px",
      [theme.breakpoints.up("smPlus")]: {
        height: "400px",
      },
      [theme.breakpoints.up("mdPlus")]: {
        height: "500px",
      },
    },
    textImgContainer: {
      display: "flex",
      width: "300px",
      flexDirection: "column-reverse",
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
      [theme.breakpoints.up("sm")]: {
        margin: "0px 20px 0px 0px",
        width: "auto",
      },
      [theme.breakpoints.up("md")]: {
        width: "500px",
      },
    },

    artwork: {
      width: "300px",
      height: "250px",
      [theme.breakpoints.up("smPlus")]: {},
      [theme.breakpoints.up("mdPlus")]: {
        display: "flex",
        height: "450px",
        width: "auto",
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
      padding: "20px 0px 10px 0px",
      fontWeight: 350,
      "& a": {
        textDecoration: "underline",
      },
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding: "20px 10px 10px 10px",
      },
    },

    upperText: {
      margin: "10px 0px 10px 0px",
      fontSize: "24px",
      fontFamily: "Gotham",
      fontWeight: 350,
    },

    jobs: {
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        flexDirection: "column",
      },
    },

    jobName: {
      fontWeight: 450,
      fontFamily: "Gotham",
      textDecoration: "underline",
    },

    apply: {
      textDecoration: "underline",
    },
  })
);
