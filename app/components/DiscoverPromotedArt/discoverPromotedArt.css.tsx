import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { rowGap, columnGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    imgContainer: {
      textAlign: "center",
      marginBottom: "0px",
      display: "flex",
      flexDirection: "row",

      [theme.breakpoints.up("smPlus")]: {
        flexDirection: "row",
        padding: "0px",
      },
    },
    apLogo: {
      height: "46px",
      width: "125px",
      [theme.breakpoints.up("smPlus")]: {
        height: "56px",
        width: "165px",
      },
    },
    x: {
      marginLeft: "20px",
      marginRight: "20px",
      fontSize: "16px",
      [theme.breakpoints.up("smPlus")]: {
        marginLeft: "20px",
        marginRight: "20px",
        fontSize: "18px",
      },
    },

    text: {
      width: "90%",
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "16px",
      [theme.breakpoints.up("smPlus")]: {
        width: "70%",
        fontSize: "24px",
      },
    },
  })
);
