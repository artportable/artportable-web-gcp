import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { columnGap } from "../app/utils/styleUtils";

export const styles = makeStyles((theme: Theme) => {
  return createStyles({
    flexContainer: {
      position: "relative",
      display: "flex",
      flexDirection: "column-reverse",
      marginLeft: "auto",
      marginRight: "auto",
      ...columnGap(theme.spacing(2)),
      alignItems: "center",
      flexWrap: "nowrap",
      padding: "0, 5px",
      [theme.breakpoints.up("mdPlus")]: {
        padding: "0",
        flexDirection: "row",
        ...columnGap(0),
      },
    },
    left: {
      textAlign: "left",
      flexBasis: "100%",
      flexGrow: 2,
      width: "90&",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      flexDirection: "column",
      ...columnGap(theme.spacing(1)),
      margin: "0px, 0px, 0px, 0px",

      [theme.breakpoints.up("smPlus")]: {
        margin: "0px, 0px, 0px, 0px",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "initial",
        margin: "0px, 0px, 0px, 0px",
      },
      [theme.breakpoints.up("mdPlus")]: {
        textAlign: "initial",
        margin: "0px, 0px, 0px, 0px",
        placeItems: "flex-start",
      },
    },

    card: {
      width: "100%",
      height: "100%",
      marginTop: "20px",
      marginBottom: "20px",
      textAlign: "center",
      borderStyle: "solid",
      background: "#F5F5F5",
      borderWidth: "5px",
      [theme.breakpoints.up("smPlus")]: {
        borderWidth: "5px",
      },

      filter: "drop-shadow(3px 8px 8px rgba(0, 0, 0, 0.4))",
    },

    headline: {
      fontWeight: 600,
      fontSize: "1.5rem",
      textAlign: "initial",
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(10),
      color: "var(--text-color)",
      [theme.breakpoints.up("sm")]: {
        fontSize: "2rem",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "left",
      },
    },

    description: {
      margin: theme.spacing(2, 0),
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(4),
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "1.38",
      color: "var(--text-color)",
      [theme.breakpoints.up("sm")]: {
        fontSize: "1.0rem",
      },
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(3),
        textAlign: "initial",
      },
      [theme.breakpoints.up("mdPlus")]: {
        textAlign: "left",
      },
    },
    right: {
      display: "flex",
      flexDirection: "column",
      flexBasis: "100%",
      alignItems: "flex-end",
      height: "70%",
      [theme.breakpoints.up("md")]: {
        marginTop: "25px",
        height: "70%",
      },
    },
    welcomeText: {
      marginBottom: "60px",
      fontSize: "14px",
      fontStyle: "italic",
      color: "var(--text-color)",
      textAlign: "left",
    },
    image: {
      width: "100%",
      height: "100%",
      marginTop: "0px",
      marginBottom: "0px",
      borderStyle: "solid",
      background: "#F5F5F5",
      borderColor: "#faf3ee",
      borderWidth: "5px",
      [theme.breakpoints.up("smPlus")]: {
        borderWidth: "5px",
      },

      filter: "drop-shadow(3px 8px 8px rgba(0, 0, 0, 0.4))",
      maxWidth: "100%",
    },

    frame: {
      width: "100%",
      height: "100%",
      marginTop: "0px",
      marginBottom: "0px",
      textAlign: "center",
      [theme.breakpoints.up("smPlus")]: {},
      filter: "drop-shadow(3px 8px 8px rgba(0, 0, 0, 0.4))",
    },
    divider: {
      width: "100%",
      borderTop: "2px solid var(--text-color)",
      marginTop: "60px",
      margin: `${theme.spacing(4)}px 0`,
    },
  });
});
