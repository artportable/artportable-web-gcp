import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    styleButton: {
      backgroundColor: "black",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.primary.contrastText,
      border: "0px",
      boxShadow: "none",
      cursor: "pointer",
      margin: "8px 20px",
      borderRadius: "100px",
      padding: "8px 16px",
      width: "260px",
      maxWidth: "fill-available",
      height: "35px",
      fontSize: "16px",
      fontWeight: 400,
      marginTop: "30px",
      fontFamily: "Roboto",
      "&:hover": {
        backgroundColor: "#0176D5",
        textDecoration: "underline",
      },
      [theme.breakpoints.up("smPlus")]: {
        margin: "20px 60px",
        fontSize: "16px",
      },
      [theme.breakpoints.up("md")]: {},
    },
  })
);
