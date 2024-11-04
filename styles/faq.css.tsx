import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { rowGap, columnGap } from "../app/utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    headerContainer: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "black",
      color: " white",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "28px",
      padding: "10px",
      height: "40vh",
      textAlign: "center",
      [theme.breakpoints.up("md")]: {
        fontSize: "35px",
      },
    },
    faqContainer: {
      display: "flex",
      flexDirection: "column-reverse",
      justifyContent: "center",
      alignItems: "flex-start",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
      },
    },
    faqAnswers: {
      width: "100vw",
      marginBottom: "10px",
      [theme.breakpoints.up("md")]: {
        width: "60vw",
      },
    },
    boxNav: {
      display: "flex",
      flexDirection: "column",
      padding: "10px",
      borderRadius: "2px",
      marginLeft: "10px",
      [theme.breakpoints.up("md")]: {
        position: "sticky",
        marginTop: "40px",
        top: "80px",
      },
    },
    titlesWrapper: {
      marginTop: "20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "10px",
      paddingLeft: "20px",
      paddingRight: "20px",
      [theme.breakpoints.up("md")]: {
        fontSize: "16px",
      },
    },
    h1: {
      fontSize: "16px",
      [theme.breakpoints.up("md")]: {
        fontSize: "35px",
      },
    },
    articles: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    subTitle: {
      fontSize: "14px",
      margin: "0px",
      [theme.breakpoints.up("md")]: {
        fontSize: "28px",
      },
    },
    numbers: {
      fontSize: "22px",
      backgroundColor: "#fadf87",
      color: "white",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    contactButton: {
      padding: "10px",
      borderRadius: "20px",
      fontSize: "14px",
      backgroundColor: "black",
      color: "white",
    },
  })
);
