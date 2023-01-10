import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    cookieConsentBarContainer: {
      backgroundColor: "var(--background-color)",
      alignItems: "baseline",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      left: "0",
      bottom: "0",
      position: "fixed",
      width: "100%",
      zIndex: 999,
    },
    cookieConsentBarContent: {
      margin: "15px",
      "& a": {
        color: theme.palette.primary.main,
      },
    },
    cookieConsentBarButton: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      border: "0px",
      boxShadow: "none",
      cursor: "pointer",
      margin: "15px",
      borderRadius: "24px",
      padding: "5px 10px",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  })
);
