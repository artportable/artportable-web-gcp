import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { rowGap } from "../app/utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    discoverContainer: {
      position: "relative",
      paddingTop: theme.spacing(0),
      marginTop: "20px",
    },
    tabContainer: {
      display: "flex",
      flexDirection: "column",
    },

    headTitle: {
      fontSize: "26px",
      marginBottom: "0px",
      marginTop: "50px",
      fontFamily: "Roboto",
      fontWeight: 400,
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "40px",
      },
    },
    headText: {
      fontSize: "13px",
      fontFamily: "Joan",
      fontWeight: 400,
      marginBottom: "20px",
      color: "#000000c7",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "20px",
      },
    },

    loginButton: {
      borderRadius: "40px",
      fontWeight: 600,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "#0176D5",
      color: "white",
      marginTop: "20px",
      width: "auto",
      margin: "0 auto",
      "&:hover": {
        backgroundColor: "#E2B651",
        color: "white",
        textDecoration: "underline",
      },
    },

    divider: {
      [theme.breakpoints.up("smPlus")]: {
        marginTop: "100px",
      },
    },
    exhibitionBoost: {
      marginTop: 40,
      paddingBottom: 0,
      fontWeight: 500,
      fontSize: "1.4rem",
      [theme.breakpoints.up("smPlus")]: {
        // fontSize: '1.35rem',
        fontSize: "1.6rem",
      },
    },
    artTabs: {
      "& .MuiTab-root": {
        minWidth: 0,
        color: "black",
        opacity: 1,
      },
      "& .Mui-selected": {
        color: "black",
        opacity: 1,
      },

      margin: "0 auto",
      "& .MuiTabs-scroller": {
        flexGrow: "0",
      },

      "& .MuiTabScrollButton-root": {
        width: "unset",
        opacity: "0.8",
      },
      justifyContent: "center",
      width: "100%",
      "& span": {
        // Prevent tab automatically being upper case.
        textTransform: "none",
        // Same look as header set in DiscoverArt.tsx.
        fontWeight: 500,
        [theme.breakpoints.up("sm")]: {
          // fontSize: '1.35rem',
          fontSize: "1.1rem",
        },
      },
    },
    artButton: {
      minWidth: "100px",
      height: "50px",
      minHeight: "36px",
      whiteSpace: "nowrap",
      padding: theme.spacing(2, 2, 2, 2),
      fontSize: "0.9rem",
      borderRadius: "18px",
      color: "white",
      [theme.breakpoints.up("smPlus")]: {
        color: "white",
      },
      "&:hover": {
        backgroundColor: "#00000036",
      },
    },
    arrowDown: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textTransform: "uppercase",
      fontSize: "14px",
    },
    desktopHeaderButtons: {
      minWidth: "100px",
      height: "36px",
      minHeight: "36px",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 3, 0, 3),
      color: "#3d3d4e",
      fontSize: "14px",
      borderRadius: "18px",
      marginTop: "10px",
      marginBottom: "20px",
      backgroundColor: "#fadf87",
      textTransform: "uppercase",
      "&:hover": {
        backgroundColor: "#F7E2A8",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "initial",
      },
    },
    headline: {
      fontWeight: 400,
      fontSize: "16px",
      textAlign: "center",
      color: "black",
      zIndex: 20,
      padding: "20px",
      textTransform: "uppercase",
      "& span": {
        display: "none",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "center",
      },
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "3.0rem",
        width: "70%",
      },
    },
    artistTab: {
      "& .MuiTab-root": {
        minWidth: 0,
        color: "black",
        opacity: 1,
      },
      "& .Mui-selected": {
        color: "black",
        opacity: 1,
      },
      "& .MuiTabs-scroller": {
        flexGrow: "0",
      },

      "& .MuiTabScrollButton-root": {
        width: "unset",
        opacity: "0.8",
      },
      justifyContent: "center",
      width: "100%",
      marginTop: "45px",
    },
    text: {
      minWidth: 0,
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      opacity: 1,
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
        margin: 0,
      },
      "&:hover": {
        opacity: 0.4,
      },
    },

    [theme.breakpoints.up("lg")]: {
      artTabs: {
        "& .MuiTabScrollButton-root": {
          // When tabs were smaller, they could all fit on desktop, so hid scroll buttons then.
          // display: "none",
        },
      },
      artistTab: {
        "& .MuiTabScrollButton-root": {
          display: "none",
        },
      },
    },

    [theme.breakpoints.up("lgPlus")]: {
      tabContainer: {
        flexDirection: "row",
      },
      artTabs: {
        marginLeft: "0px",
        "& .MuiTabScrollButton-root": {
          display: "none",
        },
      },
      artistTab: {
        marginLeft: "0",
        marginTop: "0",
        "& .MuiTabScrollButton-root": {
          display: "none",
        },
        text: {
          marginRight: theme.spacing(2),
          marginLeft: theme.spacing(2),
        },
      },
    },
  })
);
