import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { rowGap } from "../app/utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    discoverContainer: {
      position: "relative",
      paddingTop: theme.spacing(0),
    },
    tabContainer: {
      display: "flex",
      flexDirection: "column",
    },
    artTabs: {
      margin: "0 auto",
      "& .MuiTabs-scroller": {
        flexGrow: "0",
      },
      "& .MuiTab-root": {
        minWidth: 0,
      },
      "& .MuiTabScrollButton-root": {
        width: "unset",
        opacity: "0.8",
      },
      justifyContent: "center",
      width: "100%",
    },
    artistTab: {
      "& .MuiTabs-scroller": {
        flexGrow: "0",
      },
      "& .MuiTab-root": {
        minWidth: 0,
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
    },

    [theme.breakpoints.up("lg")]: {
      artTabs: {
        "& .MuiTabScrollButton-root": {
          display: "none",
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
