
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    cookieConsentBarContainer: {
      backgroundColor: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "fixed",
      width: "fill-available",
      zIndex: 999,
      padding: "16px 28px",
      border: "1px solid rgba(0, 0, 0, 0.3)",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
      margin: "0px 4px 4px",
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
      width: "100%",
      maxWidth: "328px",
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
      },
      cookieConsentBarButton: {
        marginTop: "20px",
        marginLeft: "60px",
      },
      cookieConsentBarContainer: {
        padding: "40px 37px",
      },
      cookieConsentBarTextClass: {
        marginTop: "12px",
      },
      cookieConsentBarIconClass: {
        marginRight: "16px",
      },
    },

    [theme.breakpoints.up("md")]: {
      cookieConsentBarContainer: {
        padding: "44px 90px",
      },
    },
  })
);
