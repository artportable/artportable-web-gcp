import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BorderBottomSharp } from "@material-ui/icons";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    imageWrapper: {
      position: "relative",
      width: "100vw",
      height: "150px",
      right: "auto",
      [theme.breakpoints.up("mdPlus")]: {
        position: "relative",
        width: "100vw",
        height: "400px",
        right: "auto",
      },
    },
    textContainer: {
      width: "90%",
      margin: "0 auto",
      marginTop: "50px",
      display: " flex",
      flexDirection: "column",
      [theme.breakpoints.up("mdPlus")]: {
        width: "60%",
      },
    },

    mainTitle: {
      marginTop: "10px",
      fontSize: "32px",
      fontFamily: "Roboto",
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "42px",
      },
    },
    mainText: {
      zIndex: 10,
      fontSize: "18px",
      fontFamily: "Joan",
    },

    title: {
      fontSize: "22px",
      fontFamily: "Roboto",
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "30px",
      },
    },

    text: {
      fontSize: "18px",
      fontFamily: "Joan",
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "18px",
      },
    },

    imageRow: {
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      [theme.breakpoints.up("mdPlus")]: {
        flexDirection: "row",
      },
    },

    image: {
      marginBottom: "20px",
      [theme.breakpoints.up("smPlus")]: {
        flexDirection: "row",
      },
    },
  })
);
