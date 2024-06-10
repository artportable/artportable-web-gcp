import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    story: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "800px",
    },
    image: {
      width: "100%",
      height: "auto",
      marginBottom: "6px",
    },
    publishShare: {
      display: "flex",
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "25px",
    },
    published: {
      color: "#999999",
      fontSize: "16px",
      marginRight: "10px",
      marginTop: "4px",
    },

    title: {
      fontSize: "2.5rem",
      textAlign: "center",
      color: "#333",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.8rem",
        textAlign: "center",
      },
    },
    text: {
      fontSize: "1.2rem",
      padding: "1rem 0px",
      lineHeight: "1.6",
      whiteSpace: "pre-line",
      color: "#555",
      "& a": {
        textDecoration: "underline",
      },
    },
    btnContainer: {
      display: "flex",
      justifyContent: "center",
    },
    editButton: {
      backgroundColor: "#ffd700",
      "&:hover": {
        backgroundColor: "#ffd700",
      },
    },
    writerContainer: {
      marginTop: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    writerImage: {
      height: "120px",
      width: "120px",
    },
    shareButton: {
      height: "28px",
      backgroundColor: "#ffd700",
      "&:hover": {
        backgroundColor: "#ffd700",
      },
    },
  })
);
