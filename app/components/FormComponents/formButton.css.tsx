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
        borderRadius: "5px",
        padding: "8px 16px",
        width: "100%",
        maxWidth: "fill-available",
        height: "56px",
        fontSize: "16px",
        fontWeight: 350,
        textTransform: "uppercase",
        fontFamily: "Gotham",

        [theme.breakpoints.up("smPlus")]: {
            margin: "20px 60px",
        },

        [theme.breakpoints.up("md")]: {

        },
    }
  }))