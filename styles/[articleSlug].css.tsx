import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { rowGap, columnGap } from "../app/utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      justifySelf: "center",
      zIndex: 1,
      maxWidth: "1200px",
      margin: "0 auto",

      padding:"20px",
      marginTop: "40px",
      [theme.breakpoints.up("md")]: {
    
        marginTop: "0px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "0",
        marginTop: "0px",
      },
    },
    line: {
      height: "1px",
      backgroundColor: "#e5e5e5",
      margin: "50px 0",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        margin: "40px 0",
      },
    },
    lineSpaced: {
      height: "1px",
      backgroundColor: "#e5e5e5",
      margin: "40px 0",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        margin: "30px 0",
      },
    },
    articleImages: {
      fontFamily: "Joan",
      fontSize: "18px",
      lineHeight: "1.8",
      color: "#2c2c2c",
      "& figure": {
        textAlign: "center",
        margin: "50px 0",
        [theme.breakpoints.down("sm")]: {
          margin: "30px 0",
        },
      },
      "& p": {
        fontSize: "18px",
        lineHeight: "1.8",
        marginBottom: "30px",
        color: "#2c2c2c",
        fontWeight: 400,
        fontFamily: "'Joan', 'Georgia', 'Times New Roman', serif",
        [theme.breakpoints.down("sm")]: {
          fontSize: "16px",
          lineHeight: "1.7",
          marginBottom: "25px",
        },
      },
      "& p:has(img):not(:has(text))": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        margin: "20px 0",
      },
      "& p:has(img):not(:has(text)) + p:has(img):not(:has(text))": {
        marginTop: "0",
      },
      "& .image-row": {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "20px",
        margin: "40px 0",
        flexWrap: "wrap",
        [theme.breakpoints.down("sm")]: {
          gap: "15px",
          margin: "25px 0",
        },
      },
      "& .image-column": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: "1",
        maxWidth: "80%",
        [theme.breakpoints.down("sm")]: {
          maxWidth: "70%",
        },
      },
      "& .image-column p": {
        margin: "0 0 15px 0",
        textAlign: "center",
      },
      "& .image-column img": {
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        borderRadius: "4px",
        margin: "0 auto",
        display: "block",
      },
      "& .image-row img": {
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        margin: "0 auto",
        borderRadius: "4px",
        display: "block",
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
      },
      "& .article-image": {
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        margin: "20px auto",
        borderRadius: "4px",
        display: "block",
      },
      "& img": {
        maxWidth: "400px",
        height: "auto",
        margin: "0",
        display: "block",
        borderRadius: "4px",
      },
      "& h1": {
        fontFamily: "Roboto",
        fontSize: "36px",
        fontWeight: 700,
        lineHeight: "1.2",
        color: "#1a1a1a",
        marginTop: "60px",
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: {
          fontSize: "28px",
          marginTop: "40px",
          marginBottom: "20px",
        },
      },
      "& h2": {
        fontFamily: "'Roboto', 'Helvetica Neue', 'Arial', sans-serif",
        fontSize: "28px",
        fontWeight: 600,
        lineHeight: "1.3",
        color: "#1a1a1a",
        marginTop: "50px",
        marginBottom: "25px",
        [theme.breakpoints.down("sm")]: {
          fontSize: "22px",
          marginTop: "35px",
          marginBottom: "20px",
        },
      },
      "& h3": {
        fontFamily: "'Roboto', 'Helvetica Neue', 'Arial', sans-serif",
        fontSize: "22px",
        fontWeight: 600,
        lineHeight: "1.4",
        color: "#1a1a1a",
        marginTop: "40px",
        marginBottom: "20px",
        [theme.breakpoints.down("sm")]: {
          fontSize: "20px",
          marginTop: "30px",
          marginBottom: "15px",
        },
      },
      "& a": {
        color: "#000",
        textDecoration: "underline",
        textDecorationThickness: "1px",
        textUnderlineOffset: "3px",
        "&:hover": {
          color: "#666",
        },
      },
      "& blockquote": {
        borderLeft: "3px solid #000",
        paddingLeft: "30px",
        margin: "40px 0",
        fontStyle: "italic",
        fontSize: "20px",
        lineHeight: "1.6",
        color: "#4a4a4a",
        fontFamily: "'Joan', 'Georgia', 'Times New Roman', serif",
        [theme.breakpoints.down("sm")]: {
          paddingLeft: "20px",
          margin: "30px 0",
          fontSize: "18px",
        },
      },
      "& strong": {
        fontWeight: 600,
      },
      "& em": {
        fontStyle: "italic",
      },
    },
    coverImage: {
      width: "100%",
      height: "250px",
      objectFit: "cover",
      marginTop: "20px",
      marginBottom: "30px",
   
      [theme.breakpoints.down("md")]: {
        height: "350px",
        marginBottom: "0px",
      },
      [theme.breakpoints.down("sm")]: {
        height: "150px",
    
      },
    },
    categoryText: {
      fontSize: "11px",
      fontWeight: 700,
      color: "#000",
      textTransform: "uppercase",
      letterSpacing: "2px",
      fontFamily: "'Roboto', 'Helvetica Neue', 'Arial', sans-serif",
      [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
        letterSpacing: "1.5px",
        marginBottom: "12px",
      },
    },
    authorText: {
      fontSize: "14px",
      color: "#666",

      fontFamily: "'Joan', 'Georgia', 'Times New Roman', serif",
      fontWeight: 400,
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
     
      },
    },
    dateText: {
      fontSize: "14px",
      color: "#999",
      marginBottom: "20px",
      fontFamily: "'Joan', 'Georgia', 'Times New Roman', serif",
      fontWeight: 400,
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
      },
    },
    headingDiv: {
      padding: "0 30px",
      marginBottom: "10px",
      textAlign: "left",
      [theme.breakpoints.up("md")]: {
        padding: "0",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "0 20px",
        marginBottom: "40px",
      },
    },
    articleTitle: {
      fontSize: "48px",
      fontWeight: 700,
      lineHeight: "1.1",
      color: "#1a1a1a",
      marginBottom: "0",
      fontFamily: "'Roboto', 'Helvetica Neue', 'Arial', sans-serif",
      marginTop: "30px",
      [theme.breakpoints.down("md")]: {
        fontSize: "36px",
        marginTop: "25px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "28px",
        lineHeight: "1.2",
        marginTop: "20px",
      },
    },
    articleContent: {
      padding: "0 30px",
      [theme.breakpoints.up("md")]: {
        padding: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "20px",
        width: "100%",
      },
    },
    metaInfo: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      gap: "15px",
      paddingTop: "10px",
      borderBottom: "1px solid #e5e5e5",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
        marginTop: "20px",
        paddingTop: "15px",
      },
    },
  })
);
