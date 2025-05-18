import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    styleButton: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: "30px",
      fontWeight: 500,
      justifyContent: "center",
      cursor: "pointer",
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "white",
      border: "1px solid black",
      color: "black",
      width: "150px",
      height: "40px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      marginTop: "30px",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        margin: "20px 60px",
        fontSize: "14px",
      },
      [theme.breakpoints.up("md")]: {},
    },
  })
);
