import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { rowGap, columnGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      // backgroundColor: "rgba(255, 238, 246, 1)",
      height: "230px",
      marginTop: "0px",
      [theme.breakpoints.up("smPlus")]: {
        marginBottom: "20px",
        padding: "20px",
        height: "300px",
        marginTop: "40px",
      },
      [theme.breakpoints.up("md")]: {
        marginBottom: "20px",
        padding: "20px",
        height: "220px",
        marginTop: "40px",
        backgroundColor: "transparent",
      },
      [theme.breakpoints.up("md")]: {
        marginBottom: "20px",
        padding: "20px",
        height: "220px",
        marginTop: "40px",
        backgroundColor: "transparent",
        width: "100%",
      },
    },
    wrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      [theme.breakpoints.up("smPlus")]: {
        alignItems: "flex-start",
      },
    },
    imgContainer: {
      textAlign: "center",

      display: "flex",
      flexDirection: "row",
      marginBottom: "20px",
      [theme.breakpoints.up("smPlus")]: {
        flexDirection: "row",
        padding: "0px",
      },
    },
    apLogo: {
      height: "46px",
      width: "125px",
      [theme.breakpoints.up("smPlus")]: {
        height: "66px",
        width: "auto",
      },
    },
    LogoTwo: {
      height: "46px",
      width: "125px",
      [theme.breakpoints.up("smPlus")]: {
        height: "56px",
        width: "auto",
      },
    },
    x: {
      marginLeft: "20px",
      marginRight: "20px",
      fontSize: "16px",
      [theme.breakpoints.up("smPlus")]: {
        marginLeft: "20px",
        marginRight: "20px",
        fontSize: "12px",
      },
    },

    text: {
      width: "100%",
      textAlign: "center",
      fontSize: "14px",
      color: "rgb(0 0 0 / 47%)",
      [theme.breakpoints.up("smPlus")]: {
        width: "80%",
        fontSize: "20px",
        fontFamily: "Joan",
        textAlign: "left",
        fontWeight: 400,
      },
    },
  })
);
