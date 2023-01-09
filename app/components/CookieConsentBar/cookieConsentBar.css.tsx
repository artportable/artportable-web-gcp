import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    cookieConsentBarContainer: {
      backgroundColor: "var(--background-color)",
      alignItems: "baseline",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      left: "0",
      bottom: "0",
      position: "fixed",
      width: "100%",
      zIndex: 999,
      padding: "16px 28px",
    },
    cookieConsentBarContent: {
      "& a": {
        color: "#000000",
        fontWeight: 700,
        fontSize: "16px",
        textDecoration: "underline",
      },
    },
    cookieConsentBarButton: {
      backgroundColor: "#000000",
      color: theme.palette.primary.contrastText,
      border: "0px",
      boxShadow: "none",
      cursor: "pointer",
      margin: "8px 0px",
      borderRadius: "5px",
      padding: "8px 16px",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      width: "100%",
      height: "56px",
      fontSize: "16px",
      fontWeight: 350,
      textTransform: "uppercase",
      fontFamily: "Gotham",
    },
    cookieConsentBarHeadingClass: {
      marginTop: 0,
      marginBottom: "8px",
    },
    cookieConsentBarTextClass: {
      fontSize: "16px",
      margin: 0,
    },

    [theme.breakpoints.up("smPlus")]: {
      cookieConsentBarHeadingClass: {
        fontSize: "24px",
      },
      cookieConsentBarContent: {
        display: "flex",
        width: "100%",
      },
      cookieConsentBarButton: {
        marginTop: "20px",
        width: "328px",
        marginLeft: "60px",
        marginRight: "-24px",
      },
      cookieConsentBarContainer: {
        padding: "40px 37px",
      },
      cookieConsentBarTextClass: {
        marginTop: "20px",
      },
      cookieConsentBarIconClass: {
        marginRight: "16px",
      },
    },

    [theme.breakpoints.up("md")]: {
      cookieConsentBarHeadingClass: {
        fontSize: "32px",
      },
    },
  })
);
