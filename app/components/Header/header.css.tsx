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
      [theme.breakpoints.down("sm")]: {
        padding: "0 8px",
      },
    },
    logo: {},
    wrapper: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "space-between",
      },
    },
    menuDrawer: {
      order: 5,
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

    loginMobile: {
      display: "flex",
      [theme.breakpoints.up("sm")]: {
        display: "none",
        fontFamily: "Roboto",
      },
    },
    loginButtonMobile: {
      borderRadius: "30px",
      fontWeight: 500,
      fontFamily: "Roboto",
      fontSize: "7px",
      backgroundColor: "black",
      color: "white",
      marginLeft: "4px",
      "&:hover": {
        backgroundColor: "transparent",
        border: "1px solid black",
        color: "black",
      },
    },
    loginButton: {
      borderRadius: "30px",
      fontWeight: 500,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "white",
      border: "1px solid black",
      color: "black",
      width: "150px",
      height: "40px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "14px",
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
      borderRadius: "30px",
      fontWeight: 500,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "white",
      border: "1px solid black",
      color: "black",
      width: "150px",
      height: "30px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "12px",
      },
    },
    logoButton: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        flex: "0 0 auto",
        order: 2,
      },
    },

    uploadStoryButton: {
      borderRadius: "30px",
      fontWeight: 500,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "white",
      border: "1px solid black",
      color: "black",
      width: "150px",
      height: "30px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      marginRight: "5px",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "12px",
      },
    },
    searchContainer: {
      display: "flex",
      alignItems: "center",
      marginLeft: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
        marginRight: 0,
        order: 3,
      },
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
      [theme.breakpoints.down("sm")]: {
        flex: "0 0 auto",
        marginLeft: 0,
        order: 4,
      },
    },
  })
);
