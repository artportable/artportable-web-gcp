import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BorderBottomSharp } from "@material-ui/icons";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    imageWrapper: {
      position: "relative",
      width: "100vw",
      height: "400px",
      right: "auto",
    },
    textContainer: {
      width: "60%",
      margin: "0 auto",
      marginTop: "50px",
      display: " flex",
      flexDirection: "column",
    },

    mainTitle: {
      marginTop: "20px",
      fontSize: "48px",
      fontFamily: "Roboto",
    },
    mainText: {
      zIndex: 10,
      fontSize: "22px",
      fontFamily: "Joan",
    },

    title: { fontSize: "32px", fontFamily: "Roboto" },

    text: {
      fontSize: "20px",
      fontFamily: "Joan",
    },

    imageRow: {
      margin: "0 auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  })
);
