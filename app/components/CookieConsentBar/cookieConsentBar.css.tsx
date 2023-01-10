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
      maxWidth: "99%",
      zIndex: 999,
      padding: "16px 28px",
      border: "1px solid rgba(0, 0, 0, 0.3)",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
      margin: "0px 6px 6px",
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
    cookieConsentBarContainerButtons: {
      width: "100%",
    },

    [theme.breakpoints.up("smPlus")]: {
      cookieConsentBarHeadingClass: {
        fontSize: "24px",
      },
      cookieConsentBarContent: {
        display: "flex",
      },
      cookieConsentBarButton: {
        marginTop: "20px",
        width: "50%",
        marginLeft: "60px",
      },
      cookieConsentBarContainer: {
        padding: "40px 37px",
        minWidth: "99%",
      },
      cookieConsentBarTextClass: {
        marginTop: "20px",
      },
      cookieConsentBarIconClass: {
        marginRight: "16px",
      },
    },

    [theme.breakpoints.up("md")]: {
      cookieConsentBarContainer: {
        width: "100%",
      },
      cookieConsentBarHeadingClass: {
        fontSize: "32px",
      },
      cookieConsentBarButton: {
        width: "30%",
      },
    },
  })
);
