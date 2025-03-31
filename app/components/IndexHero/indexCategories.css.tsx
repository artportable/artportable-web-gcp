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
      backgroundPosition: "bottom",
      backgroundRepeat: "no-repeat",
      [theme.breakpoints.up("smPlus")]: {
        width: "100%",
        height: "160px",
      },
      "&:hover": {
        boxShadow: "0px 9px 27px 8px rgba(0,0,0,0.1)",
      },
    },
    category: {
      fontSize: "14px",
      position: "absolute",
      top: "0px",
      left: "0px",
      color: "white",
      width: "100%",
      textAlign: "start",
      marginLeft: "20px",
      fontWeight: 600,
      padding: "8px",
      "&:hover": { borderColor: "#BBBAB4 #C7C7BF #E5E4DF #C7C7BF" },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "26px",
        fontWeight: 600,
      },
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
