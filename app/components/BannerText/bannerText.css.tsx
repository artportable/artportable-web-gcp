import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "200px",
      backgroundColor: "#222222",
      color: "white",
      width: "100vw",
      margin: "0 auto",
      marginTop: "0px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
   
      marginBottom: "20px",
      padding: "30px",
      [theme.breakpoints.up("smPlus")]: { 

        marginTop: "30px",
        padding :"0px" },
    },

    title: {
      fontFamily: "Roboto",
      fontWeight: 500,
      fontSize: "20px",
      marginLeft: "20px",
      marginRight: "20px",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "35px",
        marginLeft: "50px",
      },
    },
    text: {
      fontSize: "11px",
      fontFamily: "Joan",
      maxWidth: "1000px",
      marginLeft: "20px",
      marginRight: "20px",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "14px",
        marginLeft: "50px",
      },
    },
  })
);
