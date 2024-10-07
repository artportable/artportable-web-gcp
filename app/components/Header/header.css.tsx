import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      backgroundColor: "var(--background-color)",
      // boxShadow: '0px -5px 40px 0px var(--ion-color-primary)',
      // width: 'calc(100% + 10px)',
    },
    container: {
      display: "flex",
      width: "100%",
      height: "var(--header-height, 70px)",
      gap: "0 16px",
      alignItems: "center",
    },
    trialBanner: {
      display: "flex",
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "12px",
      height: "25px",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "14px",
      },
    },

    logoContainer: {
      flexGrow: 1,
      order: 2,
      textAlign: "center",
      [theme.breakpoints.up("smPlus")]: {
        order: "initial",
        textAlign: "left",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "left",
      },
      flexBasis: "100%",
      position: "relative",
      "& a": {
        position: "absolute",
        right: "calc(50% - 72px)",
        bottom: "-13px",
      },
    },
    menuIcon: {
      display: "none",
      gridArea: "menu",
    },
    logo: {
      paddingTop: theme.spacing(0.2),
    },
    navigation: {
      display: "none",
    },
    buttonInvite: {
      display: "none",
      gridArea: "invite",
      // color: '#ffffff',
      whiteSpace: "nowrap",
      // height: '31px',
      // backgroundColor: 'var(--color-green)',
      // '&.MuiButton-root:hover:hover':{
      //   backgroundColor: 'var(--color-green-darker)',
      // },
    },
    menuDrawer: {
      order: 3,
      gridArea: "menuDrawer",
      [theme.breakpoints.up("smPlus")]: {
        order: "initial",
      },
    },

    login: {
      display: "none",
    },
    upload: {
      display: "none",
      whiteSpace: "nowrap",
    },
    uploadButton: {
      minWidth: "100px",
      height: "28px",
      minHeight: "28px",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 2, 0, 2),
      margin: "1px 1px 1px 1px",
      color: "#3d3d4e",
      fontSize: "14px",
      fontWeight: "normal",
      fontFamily: "gotham",
      borderRadius: "14px",
      "&:hover": {
        backgroundColor: "#fadf87",
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
      color: "#3d3d4e",
      fontSize: "14px",
      fontWeight: "normal",
      fontFamily: "gotham",
      borderRadius: "14px",
      "&:hover": {
        backgroundColor: "#fadf87",
        color: "black",
      },
    },
    singleNotificationButton: {
      minWidth: "54px",
    },
    signUp: {
      display: "none",
      whiteSpace: "nowrap",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    createButton: {
      whiteSpace: "nowrap",
      backgroundColor: "var(--yellow-darker)",
      "&:hover": {
        backgroundColor: "#ffda79b3",
        color: "black",
      },
    },
    loginButton: {
      whiteSpace: "nowrap",
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
    premiumEmblem: {
      backgroundImage: "linear-gradient(#d1a108, #ffeeb8)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    premiumText: {
      color: "#FFFFFF",
      textTransform: "uppercase",
      fontWeight: 500,
      fontSize: "8px",
      marginRight: "12px",
    },

    [theme.breakpoints.up("sm")]: {
      menuDrawer: {
        display: "initial",
      },
      logoContainer: {
        flexBasis: "initial",
        "& a": {
          position: "static",
        },
      },
    },

    [theme.breakpoints.up("smPlus")]: {
      menuIcon: {
        display: "initial",
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

      login: {
        display: "flex",
        alignItems: "center",
        gridArea: "login",
        // '& .MuiButton-root .MuiButton-label': {
        //   margin: theme.spacing(0, 2)
        // },
        "& > *": {
          margin: theme.spacing(0, 1),
        },
        "& > .MuiIconButton-root": {
          padding: theme.spacing(0.5),
        },
      },
      menuDrawer: {
        display: "initial",
      },
    },

    [theme.breakpoints.up("md")]: {
      toolbar: {
        backgroundColor: "var(--header-color)",
        // boxShadow: '0px -5px 40px 0px var(--ion-color-primary)',
        // width: 'calc(100% + 10px)',
        // '&.MuiPaper-elevation0': {
        //   boxShadow: '0px -5px 40px 0px var(--ion-color-primary)',
        // }
      },
      container: {
        display: "grid",
        width: "100%",
        height: "var(--header-height, 70px)",
        gap: "0 5px",
        alignItems: "center",
        justifyItems: "start",
        gridTemplate:
          '"menu logo navigation invite login language menuDrawer" auto' +
          "/ auto auto 1fr auto auto",
      },

      upload: {
        display: "initial",
      },
    },
    text: {
      fontSize: "18px",
    },
    iconButtons: {
      display: "flex",
      alignItems: "center",
    },
    language: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "initial",
        gridArea: "language",
      },
    },
    [theme.breakpoints.up("mdPlus")]: {
      navigation: {
        display: "initial",
        gridArea: "navigation",
        marginLeft: "10px",
      },
      iconMenuColor: {
        color: "#000",
      },
      logo: {
        width: "188px",
      },
    },
  })
);
