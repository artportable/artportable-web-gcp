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
      textDecoration: "none", // Optional: Removes underline
      color: "inherit", // Inherits color from parent
      "&:hover": {
        color: "blue", // Changes text color to blue on hover
      },
    },
  })
);
