import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    secondaryColor: {
      backgroundColor: theme.palette.secondary.main,
    },

    nameAndFollowContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      width: "100%",
      justifyContent: "center",
      marginTop: "-30px",
      [theme.breakpoints.up("mdPlus")]: {
        flexDirection: "row",
        justifyContent: "space-evenly",
      },
    },

    followButton: {
      maxHeight: "27px",
      backgroundColor: "white",
      color: "#3d3d4e",
      border: " 1px solid black",
      marginTop: "1.5vh",
      "& .MuiButton-startIcon": {
        margin: "0 0",
      },
    },

    messageButtonText: {
      display: "none",
    },

    friends: {
      gridArea: "friends",
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
      [theme.breakpoints.up("smPlus")]: {
        display: "none",
      },
    },

    btnWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    fullName: {
      fontWeight: 600,
      fontSize: "2rem",
      justifyContent: "center",
      textAlign: "center",
      [theme.breakpoints.up("mdPlus")]: {
        letterSpacing: "13px",
      },
    },

    fontSize: {
      [theme.breakpoints.up("md")]: {
        fontSize: "1em",
      },
    },
    followerButton: {
      margin: "10px",
      cursor: "pointer",
    },

    followeeButton: {
      cursor: "pointer",
    },
    artwork: {
      paddingLeft: "10px",
    },
  })
);
