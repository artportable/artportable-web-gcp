import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { rowGap } from "../app/utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    discoverContainer: {
      position: "relative",
      paddingTop: theme.spacing(0),
      marginTop: "50px",
    },
    tabContainer: {
      display: "flex",
      flexDirection: "column",
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
