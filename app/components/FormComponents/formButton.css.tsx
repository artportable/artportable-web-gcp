import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    styleButton: {
      backgroundColor: "#000000",
      color: theme.palette.primary.contrastText,
      border: "0px",
      boxShadow: "none",
      cursor: "pointer",
      margin: "8px 20px",
      borderRadius: "100px",
      padding: "8px 16px",
      width: "160px",
      maxWidth: "fill-available",
      height: "35px",
      fontSize: "40px",
      fontWeight: 600,
      textTransform: "uppercase",
      fontFamily: "Roboto",
      "&:hover": {
        backgroundColor: "#0176D5",
      },
      [theme.breakpoints.up("smPlus")]: {
        margin: "20px 60px",
        fontSize: "16px",
      },
      [theme.breakpoints.up("md")]: {},
    },
  })
);
