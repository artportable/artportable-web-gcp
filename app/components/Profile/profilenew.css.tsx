import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    profile: {
      position: "relative",
      width: "100%",
      gridColumn: "1/4", // Cover whole width of page.
      marginBottom: 20,
    },
    profileContent: {
      margin: "0 auto",
      padding: "0 20px",
      textAlign: "center",
    },
    lightText: {
      color: "white",
    },
    annonsera: {
      marginTop: "10px",
      backgroundColor: "red",
      borderRadius: "10px",
      color: "white",
      width: "auto",
      fontSize: "13px",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#D6A407",
      },
      [theme.breakpoints.up("md")]: {
        width: "25vw",
      },
    },

    mobileImage: {
      maxWidth: "90%",
      objectFit: "contain",
    },
    followFollowersArtworks: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    counterBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    headlineModal: {
      "& button": {
        height: 44,
        borderRadius: 22,
        "&:nth-child(2)": {
          // minWidth: 132,
        },
      },
    },
    advertModal: {
      margin: "0 auto",
      height: "80vh",
    },
    fullName: {
      width: "100%",
      textAlign: "center",
      fontWeight: 600,
      fontSize: "24px",
      letterSpacing: "6px",
      wordBreak: "break-word",
      [theme.breakpoints.up("md")]: {
        fontSize: "50px",
        lineHeight: "50px",
      },
    },
    buyButton: {
      fontSize: "14px",
      color: "white",
      backgroundColor: "red",
      width: "50%",
      margin: "0 auto",
      borderRadius: "20px",
      "&:hover": {
        backgroundColor: "#D6A407",
      },
    },

    closeButton: {
      fontSize: "14px",
      color: "black",
      backgroundColor: "transparent",
      width: "50%",
      margin: "0 auto",
      borderRadius: "20px",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    headline: {
      disaply: "flex",
      textAlign: "center",
      fontWeight: 400,
      fontSize: "14px",
      letterSpacing: "2px",
      fontStyle: "italic",
      [theme.breakpoints.up("md")]: {
        fontSize: "12px",
        textAlign: "left",
        width: "70%",
      },
    },
    followersButton: {
      padding: 0,
      display: "flex",
      flexFlow: "row nowrap",
      alignItems: "baseline",
      "& :nth-child(2)": {
        paddingLeft: 5,
      },
    },
    headerActions: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    actionButton: {
      border: "1px solid black",
      backgroundColor: "white",
      margin: "0px 10px 0px 10px",
      display: "flex",
      minWidth: 110,
      fontSize: "14px",

      borderRadius: "20px",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
      "&:hover": {
        backgroundColor: "#D6A407",
        color: "white",
      },
    },

    messageButton: {
      border: "1px solid black",
      backgroundColor: "white",
      margin: "0px 10px 0px 10px",
      display: "flex",
      minWidth: 110,
      fontSize: "14px",
      borderRadius: "20px",

      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
      "&:hover": {
        backgroundColor: "#D6A407",
        color: "white",
      },
    },
    following: {
      backgroundColor: "#49cc90",
      border: "1px solid white",
      color: "white",
      "&:hover": {
        backgroundColor: "transparent",
        color: "black",
        borderColor: "#49cc90",
        "&.light-text": {
          color: "white", // Use white text when black background.
        },
      },
    },
  })
);
