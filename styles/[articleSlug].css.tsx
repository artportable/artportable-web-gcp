import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { rowGap, columnGap } from "../app/utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: "0",
      justifySelf: "center",
      zIndex: 1,
      maxWidth: "1200px",
      margin: "0 auto",
      [theme.breakpoints.up("md")]: {
        padding: "0 40px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "0",
      },
    },
    line: {
      height: "1px",
      backgroundColor: "#e0e0e0",
      margin: "40px 0",
      maxWidth: "100px",
      [theme.breakpoints.down("sm")]: {
        margin: "30px 0",
        maxWidth: "60px",
      },
    },
    lineSpaced: {
      height: "1px",
      backgroundColor: "#e0e0e0",
      margin: "30px 0",
      width: "60px",
      [theme.breakpoints.down("sm")]: {
        margin: "20px 0",
        width: "40px",
      },
    },
    articleImages: {
      fontFamily: "Joan",
      "& figure": {
        textAlign: "center",
        margin: "40px 0",
        [theme.breakpoints.down("sm")]: {
          margin: "20px 0",
        },
      },
      "& img": {
        maxWidth: "100%",
        height: "auto",
        borderRadius: "4px",
        margin: "30px 0",
        [theme.breakpoints.down("sm")]: {
          margin: "20px 0",
          borderRadius: "2px",
        },
      },
      "& p": {
        fontSize: "18px",
        lineHeight: "1.7",
        marginBottom: "24px",
        color: "#333",
        [theme.breakpoints.down("sm")]: {
          fontSize: "16px",
          lineHeight: "1.6",
          marginBottom: "20px",
        },
      },
      "& h1, & h2, & h3, & h4, & h5, & h6": {
        fontFamily: "Roboto",
        fontWeight: 500,
        marginTop: "40px",
        marginBottom: "20px",
        color: "#1a1a1a",
        [theme.breakpoints.down("sm")]: {
          marginTop: "30px",
          marginBottom: "15px",
        },
      },
      "& h2": {
        fontSize: "28px",
        [theme.breakpoints.down("sm")]: {
          fontSize: "22px",
        },
      },
      "& h3": {
        fontSize: "24px",
        [theme.breakpoints.down("sm")]: {
          fontSize: "20px",
        },
      },
      "& a": {
        color: "#1976d2",
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      },
      "& blockquote": {
        borderLeft: "4px solid #1976d2",
        paddingLeft: "20px",
        margin: "30px 0",
        fontStyle: "italic",
        color: "#666",
        [theme.breakpoints.down("sm")]: {
          paddingLeft: "15px",
          margin: "20px 0",
          borderLeftWidth: "3px",
        },
      },
    },
    coverImage: {
      width: "100%",
      height: "400px",
      objectFit: "cover",
      marginBottom: "60px",
      borderRadius: "8px",
      [theme.breakpoints.down("md")]: {
        height: "250px",
        marginBottom: "40px",
        borderRadius: "0",
      },
      [theme.breakpoints.down("sm")]: {
        height: "200px",
        marginBottom: "30px",
        borderRadius: "0",
      },
    },
    categoryText: {
      fontSize: "12px",
      fontWeight: 600,
      color: "#1976d2",
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      marginBottom: "8px",
      fontFamily: "Roboto",
      [theme.breakpoints.down("sm")]: {
        fontSize: "11px",
        letterSpacing: "1px",
        marginBottom: "6px",
      },
    },
    authorText: {
      fontSize: "14px",
      color: "#666",
      marginBottom: "8px",
      fontFamily: "Roboto",
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
        marginBottom: "6px",
      },
    },
    dateText: {
      fontSize: "14px",
      color: "#999",
      marginBottom: "0",
      fontFamily: "Roboto",
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
      },
    },
    headingDiv: {
      padding: "0 20px",
      marginBottom: "60px",
      [theme.breakpoints.up("md")]: {
        padding: "0",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "0 16px",
        marginBottom: "40px",
      },
    },
    articleTitle: {
      fontSize: "48px",
      fontWeight: 300,
      lineHeight: "1.2",
      color: "#1a1a1a",
      marginBottom: "0",
      fontFamily: "Roboto",
      [theme.breakpoints.down("md")]: {
        fontSize: "32px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "28px",
        lineHeight: "1.3",
        fontWeight: 400,
      },
    },
    articleContent: {
      padding: "0 20px",
      [theme.breakpoints.up("md")]: {
        padding: "0",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "0 16px",
      },
    },
  })
);
