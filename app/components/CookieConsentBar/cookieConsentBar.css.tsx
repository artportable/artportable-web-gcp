import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    cookieConsentBarContainer: {
      backgroundColor: "#FFFFFF",
      boxSizing: "border-box",
      padding: "20px 15px 25px 55px",
      position: "fixed",
      width: "100%",
      height: "auto",
      border: "1px solid rgba(0.5,0,0,0.2)",
      boxShadow: "2px 2px 4px 4px rgba(2, 4, 4, 0.25)",
      zIndex: 999,
      [theme.breakpoints.down("xs")]: {
        backgroundColor: "red",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 15px 25px 25px",
      },
    },
    cookieConsentBarContent: {
      "& a": {
        height: "auto",
        fontWeight: "bold",
        textDecoration: "underline",
      },
    },
    cookieConsentBarButton: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      border: "1px solid",
      boxShadow: "none",
      cursor: "pointer",
      borderRadius: "5px",
      padding: "15px 0px 15px 0px",
      width: "366px",
    },

    cookieHeader: {
      fontWeight: 450,
      fontSize: "32px",
      padding: "15px 0px 15px 0px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "24px",
        lineHeight: "30px",
        padding: "0px, 0px, 0px, 0px",
      },
    },
    cookieText: {
      fontWeight: 325,
      fontSize: "16px",
      padding: "15px 0px 15px 0px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "16px",
        lineHeight: "20px",
      },
    },
  })
);
