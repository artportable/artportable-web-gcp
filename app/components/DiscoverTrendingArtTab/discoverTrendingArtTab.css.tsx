import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    displayTitle: {
      zIndex: 10,
      color: "#3e3e3e",
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "28px",
      marginTop: "20px",
      width: "95%",
      [theme.breakpoints.up("xs")]: {
        fontSize: "14px",
        fontWeight: 700,
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "18px",
        fontWeight: 700,
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "20px",
        fontWeight: 700,
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "22px",
        fontWeight: 700,
      },
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "24px",
        fontWeight: 700,
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "24px",
        fontWeight: 700,
      },
    },
    displayText: {
      zIndex: 10,
      color: "#3e3e3e",
      fontWeight: 400,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      fontSize: "12px",
      marginTop: "10px",
      width: "95%",
      fontStyle: "italic",
      [theme.breakpoints.up("xs")]: {
        fontSize: "12px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
        right: "0px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "14px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
        right: "0px",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "22px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
        right: "0px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "22px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
        right: "35px",
      },
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "22px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
        right: "35px",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "22px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
        right: "40px",
      },
    },

    displayTextLatest: {
      zIndex: 10,
      color: "#3e3e3e",
      fontWeight: 400,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      fontSize: "12px",
      marginTop: "10px",
      width: "95%",
      fontStyle: "italic",
      [theme.breakpoints.up("xs")]: {
        fontSize: "12px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "14px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "16px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "18px",
        fontWeight: 400,
      },
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "20px",
        fontWeight: 400,
        width: "auto",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "22px",
        fontWeight: 400,
        width: "auto",
      },
    },
  })
);
