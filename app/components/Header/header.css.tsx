import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      backgroundColor: "white",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      fontFamily: "Roboto",
      [theme.breakpoints.up("smPlus")]: {},
      [theme.breakpoints.up("md")]: {},
      [theme.breakpoints.up("lg")]: {},
    },
    logo: {},
    wrapper: {
      display: "flex",

      alignItems: "center",
      justifyContent: "space-between",
      height: "var(--header-height)",
    },
    menuDrawer: {
      order: 3,
      gridArea: "menuDrawer",
      [theme.breakpoints.up("smPlus")]: {
        order: "initial",
      },
    },
    menuIcon: {
      display: "none",
      gridArea: "menu",
    },
    titleWrapper: {
      display: "none",
      fontFamily: "Roboto",
      [theme.breakpoints.up("md")]: {
        paddingLeft: "6px",
        fontSize: "14px",
        color: "black",
        display: "flex",
        flexDirection: "row",
        gap: "40px",
        marginBottom: "20px",
      },
    },
    titlesOnHeader: {
      fontSize: "16px",
      fontFamily: "Roboto",
      "&:hover": {
        color: "#0176D5",
      },
    },
    loggedIn: {
      // display: "none",
      // [theme.breakpoints.up("sm")]: {
      //   display: "flex",
      // },
    },
    login: {
      display: "none",

      [theme.breakpoints.up("sm")]: {
        display: "flex",
        fontFamily: "Roboto",
      },
    },
    loginButton: {
      borderRadius: "30px",
      fontWeight: 600,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "black",
      color: "white",
      "&:hover": {
        backgroundColor: "transparent",
        border: "1px solid black",
        color: "black",
      },
    },
    iconButtons: {
      display: "flex",
      alignItems: "center",
    },
    menuIconWithBadge: {},
    singleNotificationButton: {},
    buttonInvite: {
      display: "initial",
      marginRight: "-8px",
      fontFamily: "Roboto",
    },

    notificationButton: {
      width: "54px",
      display: "flex",

      color: "blue",
      [theme.breakpoints.up("smPlus")]: {
        order: "initial",
      },
      "& > *": {
        margin: "auto",
      },

      "& .raf-icon-badge svg": {
        fill: theme.palette.secondary.main,
      },
      "& .raf-icon-badge:hover svg": {
        fill: theme.palette.secondary.main,
      },
    },
    upload: {},

    feed: {
      display: "none",
    },

    accountType: {
      display: "none",
      [theme.breakpoints.up("smPlus")]: {
        display: "flex",
      },
    },

    buttons: {
      display: "none",
      [theme.breakpoints.up("smPlus")]: {
        display: "none",
      },
      [theme.breakpoints.up("md")]: {
        fontFamily: "Roboto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      [theme.breakpoints.up("lg")]: {},
    },

    upgradeButton: {
      backgroundColor: "#FCF7EC",
      minWidth: "100px",
      height: "28px",
      minHeight: "28px",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 2, 0, 2),
      margin: "2px 2px 2px 2px",
      fontSize: "14px",
      fontWeight: "normal",
      borderRadius: "14px",
      color: "black",
      border: "1px solid black",
      fontFamily: "Roboto",
      "&:hover": {
        border: "1px solid",
        backgroundColor: "#fadf87",
        color: "black",
      },
    },

    uploadButton: {
      minWidth: "100px",
      height: "28px",
      minHeight: "28px",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 2, 0, 2),
      margin: "2px 2px 2px 2px",
      color: "black",
      fontSize: "14px",
      fontWeight: "normal",

      borderRadius: "14px",
      border: "1px solid #229059",
      fontFamily: "Roboto",
      "&:hover": {
        backgroundColor: "#229059",
        border: "1px solid #229059",
        color: "white",
      },
    },

    uploadStoryButton: {
      minWidth: "100px",
      height: "28px",
      minHeight: "28px",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 2, 0, 2),
      margin: "1px 1px 1px 1px",
      color: "black",
      fontSize: "14px",
      fontWeight: "normal",
      borderRadius: "14px",
      fontFamily: "Roboto",
      border: "1px solid #0176D5",
      "&:hover": {
        border: "1px solid #0176D5",
        color: "white",
        backgroundColor: "#0176D5",
      },
    },
  })
);
