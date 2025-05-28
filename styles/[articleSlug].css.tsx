import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { rowGap, columnGap } from "../app/utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: "25px",
      justifySelf: "center",
      zIndex: 1,
      [theme.breakpoints.up("md")]: {
        height: "100%",
        marginTop: "0px",
        width: "calc(100vw - 50px)",
      },
    },
    line: {
      height: "2px",
      backgroundColor: "gray",
      margin: "32px 0",
    },
    lineSpaced: {
      height: "2px",
      backgroundColor: "#8080805e",
      margin: "30px 0",
      width: "100%",
    },
    articleImages: {
      fontFamily: "Joan",
      maxWidth: "800px",
      margin: "0 auto",
      "& figure": {
        textAlign: "center",
      },
      "& img": {
        maxWidth: "100%",
        height: "100%",
      },
      "& p": {
        fontSize: "1rem",
      },
      "& h3": {
        fontWeight: 500,
      },
      "& a": {
        textDecoration: "underline",
      },
      width: "fit-content",
    },
    coverImage: {
      width: "100vw",
      marginLeft: "-25px",
      marginRight: "-25px",
      height: "200px",
      objectFit: "cover",
      marginBottom: "20px",
      [theme.breakpoints.up("md")]: {
        marginLeft: "-50px",
        marginRight: "-50px",
        width: "calc(100vw - 50px + 100px)",
      },
    },
    categoryText: {
      marginBottom: "0px",
      color: "#666",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    authorText: {
      marginBottom: "0px",
      fontStyle: "italic",
    },
    headingDiv: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      maxWidth: "800px",  
      margin: "0 auto",
      ...columnGap(2),
    },
  })
);
