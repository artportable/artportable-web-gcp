import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100vw",
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      justifyContent: "center",
      gap: "15px",
      textAlign: "center",
      justifyItems: "center",
      padding: "0px 30px 0px 30px",
      height: "100%",
      [theme.breakpoints.up("smPlus")]: {
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        padding: "0 70px",
        height: "100%",
      },
      [theme.breakpoints.up("md")]: {},
    },
    item: {
      width: "100%",
      height: "100px",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      overflow: "hidden",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",

      [theme.breakpoints.up("smPlus")]: {
        width: "100%",
        height: "160px",
      },
      "&:hover": {
        boxShadow: "0px 9px 27px 8px rgba(0,0,0,0.1)",
        borderRadius: "5px",
      },
    },
    category: {
      fontSize: "22px",
      position: "absolute",
      bottom: "0px",
      left: "0px",
      color: "black",
      width: "100%",
      textAlign: "left",
      background:
        "linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
      padding: "8px",
      "&:hover": { borderColor: "#BBBAB4 #C7C7BF #E5E4DF #C7C7BF" },
    },
    loginButton: {
      borderRadius: "40px",
      fontWeight: 600,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "#0176D5",
      color: "white",
      marginTop: "30px",
      "&:hover": {
        backgroundColor: "#E2B651",
        color: "white",
        textDecoration: "underline",
      },
    },
  })
);
