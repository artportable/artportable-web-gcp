import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    feedContainer: {
      backgroundColor: "var(--background-color)",
      display: "flex",
      flexDirection: "column",
    },
    colLeft: {
      marginBottom: "20px",
    },
    colFeed: {
      display: "flex",
      flexDirection: "column",

      "& .MuiCard-root": {
        marginBottom: "10px",
      },
    },
    colFollow: {
      display: "none",

      "& .MuiCard-root": {
        height: "100%",
        maxHeight: "360px",
      },
    },
    margin: {
      marginTop: "0px",
      [theme.breakpoints.up("mdPlus")]: {
        marginTop: "30px",
      },
    },
    [theme.breakpoints.up("sm")]: {
      colLeft: {
        width: "100%",
        marginRight: "20px",
        marginBottom: 0,
        alignItems: "center",

        "& .MuiCardContent-root": {
          padding: "18px 28px",
          height: "100%",
          maxHeight: "400px",
        },
      },

      colFollow: {
        width: "100%",
        display: "flex",

        "& .MuiCard-root": {
          height: "100%",
          maxHeight: "400px",
          width: "100%",
        },
        "& .MuiCardContent-root": {
          paddingBottom: "10px",
        },
      },
      sidebarLeft: {
        display: "flex",
        width: "100%",
        marginBottom: "20px",
      },
    },

    [theme.breakpoints.up("mdPlus")]: {
      feedContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
      },
      colFollow: {
        display: "block",
        "& .MuiCardContent-root": {
          padding: "2px 20px 5px 20px",
        },
      },
      sidebarLeft: {
        height: "0px",
        display: "flex",
        flexDirection: "column",
        marginRight: "20px",
        width: "100%",
        maxWidth: "340px",
        alignSelf: "flex-start",
        position: "sticky",
        top: "calc(var(--header-height) + var(--header-box-shadow-padding))",
      },
      colFeed: {
        width: "100%",
        maxWidth: "400px",
      },
      colLeft: {
        marginBottom: "12px",
        "& .MuiCardContent-root": {
          padding: "16px 20px",
        },
        "& .MuiBox-root": {
          display: "flex",
          flexDirection: "row",
        },
      },
    },

    [theme.breakpoints.up("lg")]: {
      colFeed: {
        maxWidth: "600px",
      },
    },
  })
);
