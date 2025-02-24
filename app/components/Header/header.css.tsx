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
      "&:hover": {
        color: "#0000ffb8",
      },
    },
    login: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
      },
    },
    loginButton: {
      borderRadius: "40px",
      border: "1px solid #99999987",
      fontWeight: 300,
      "&:hover": {
        backgroundColor: "black",
        color: "white",
      },
    },
    iconButtons: {
      display: "flex",
      alignItems: "center",
    },
    menuIconWithBadge: {
      display: "none",
    },
    singleNotificationButton: {
      display: "none",
    },
    buttonInvite: {
      display: "initial",
      marginRight: "-8px",
    },

    notificationButton: {
      width: "54px",
      display: "flex",
      order: 1,
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
      fontFamily: "gotham",
      borderRadius: "14px",
      color: "black",
      border: "1px solid black",
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
      color: "white",
      fontSize: "14px",
      fontWeight: "normal",
      fontFamily: "gotham",
      borderRadius: "14px",
      border: "1px solid #229059",
      backgroundColor: "#229059",
      "&:hover": {
        border: "1px solid #229059",
        color: "black",
      },
    },

    uploadStoryButton: {
      minWidth: "100px",
      height: "28px",
      minHeight: "28px",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 2, 0, 2),
      margin: "1px 1px 1px 1px",
      color: "white",
      fontSize: "14px",
      fontWeight: "normal",
      fontFamily: "gotham",
      borderRadius: "14px",
      border: "1px solid #0176D5",
      backgroundColor: "#0176D5",
      "&:hover": {
        border: "1px solid #0176D5",
        color: "black",
      },
    },
  })
);
