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
      marginRight: "35px",
      marginLeft: "16px",
      margin: theme.spacing(0, 0, 0, 0),

      [theme.breakpoints.up("smPlus")]: {
        margin: theme.spacing(0, 0, 2, 0),
        marginRight: "35px",
        width: "567px",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "initial",
        margin: theme.spacing(0, 0, 2, 4),
        marginRight: "35px",
      },
      [theme.breakpoints.up("mdPlus")]: {
        textAlign: "initial",
        margin: theme.spacing(0, 0, 2, 4),
        marginRight: "35px",
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
      marginTop: theme.spacing(6),
      color: "var(--secondary-color)",
      [theme.breakpoints.up("sm")]: {
        fontSize: "2rem",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "left",
      },
    },

    description: {
      margin: theme.spacing(1, 0),
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(4),
      fontSize: "10pt",
      fontWeight: 400,
      lineHeight: "1.38",
      color: "var(--text-color)",
      [theme.breakpoints.up("sm")]: {
        fontSize: "0.8rem",
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
      marginBottom: theme.spacing(3),
      fontStyle: "italic",
      color: "var(--text-color)",
      textAlign: "left",
    },
    image: {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "#BBBAB4 #C7C7BF #E5E4DF #C7C7BF",
      boxShadow:
        "0 -1px 1px rgba(0,0,0,.1), 0 1px 1px 1px rgba(255,255,255,.7)",
      maxWidth: "100%",
    },

    frame: {
      listStyle: "none",
      listStyleType: "none",
      margin: "0px",
      textAlign: "center",
      display: "inline-block",
      borderWidth: "0px",
      borderStyle: "solid",
      borderColor: "var(--header-color)",
      background: "#F5F5F5",
      [theme.breakpoints.up("smPlus")]: {
        borderWidth: "5px",
      },
      backgroundImage: "linear-gradient(#FFFEF8, #F3F3F1)",
      filter: "drop-shadow(3px 8px 8px rgba(0, 0, 0, 0.4))",
      position: "relative",
      overflow: "hidden",
      "& :before": {
        content: '""',
        position: "absolute",
        top: "-175px",
        right: "-20%",
        width: "400px",
        height: "400px",
        transform: "rotateZ(-40deg)",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.4), rgba(255,255,255,0))",
      },
    },
    divider: {
      width: "100%",
      borderTop: "2px solid var(--primary-color)",
      marginTop: "60px",
      margin: `${theme.spacing(4)}px 0`,
    },
  });
});
