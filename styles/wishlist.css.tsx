import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "#FDF9F7",
      width: "100vw",
      margin: "0 auto",
    },
    header: {
      backgroundColor: "black",
      color: "white",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    favoriteTitle: {
      fontSize: "66px",
      fontWeight: "lighter",
      marginBottom: "0px",
    },
    favoriteText: {
      marginTop: "0px",
      marginBottom: "60px",
    },

    artworksContainer: {
      marginTop: "40px",
      width: "80%",
      margin: "0 auto",
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
