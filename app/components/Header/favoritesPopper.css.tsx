import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "#FDF9F7",
      padding: "10px 20px 10px 20px",
      border: "1px solid #00000029",
    },

    buttonViewMore: {
      color: "black",
      fontSize: "16px",
      marginBottom: "10px",
      border: "1px solid #99999987",
      padding: "10px",
      paddingLeft: "20px",
      paddingRight: "20px",
      borderRadius: "20px",
      "&:hover": {
        color: "white",
        backgroundColor: "blue",
        textDecoration: "none",
      },
    },

    link: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      textDecoration: "none",
      color: "inherit", 
      "&:hover": {
        color: "blue", 
      },
    },

    title: {
      textAlign: "center",
      fontSize: "16px",
      marginBottom: "10px",
      marginTop: "10px",
      fontWeight: "normal",
    },

    loadingText: {
      textAlign: "center",
      padding: "10px",
    },

    errorText: {
      color: "red",
      textAlign: "center",
      padding: "10px",
    },

    noFavoritesText: {
      textAlign: "center",
      padding: "10px",
    },

    artworkSection: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: "10px",
      paddingBottom: "10px",
      "&:not(:last-child)": {
        borderBottom: "1px solid #ccc",
      },
    },

    artworkImage: {
      marginBottom: "20px",
    },

    artworkTitle: {
      fontSize: "13px",
      marginLeft: "10px",
      marginBottom: "0px",
      fontWeight: "bold",
    },

    artworkDimensions: {
      fontSize: "12px",
      marginLeft: "10px",
      paddingTop: "0px",
      marginTop: "0px",
    },

    viewAllContainer: {
      display: "flex",
      justifyContent: "center",
    },
  })
);
