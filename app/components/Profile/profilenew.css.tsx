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
      backgroundColor: "#FFDA7A",
      borderRadius: "20px",
      color: "black",
      "&:hover": {
        backgroundColor: "#D6A407",
      },
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
      flexFlow: "row wrap",
      justifyContent: "center",
      alignItems: "center",
    },
    actionButton: {
      backgroundColor: "#FFDA7A",
      display: "flex",
      minWidth: 220,
      margin: "0 auto",
      fontSize: "16px",
      border: "1px solid transparent",
      borderRadius: "33px",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
      "&:hover": {
        backgroundColor: "#D6A407",
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
