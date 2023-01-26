import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    TextField: {
      paddingLeft: "8px",
      paddingRight: "20px",
      paddingBottom: "5px",
      paddingTop: "5px",
      maxHeight: "100px",
      height: "100%",
      width: "100%",
      fontFamily: "Gotham",
      fontSize: "16px",

      [theme.breakpoints.up("smPlus")]: {
        paddingLeft: "20px",
        paddingBottom: "10px",
        paddingTop: "10px",
        maxHeight: "52px",
        height: "100%",
      },
    },

    inputContainer: {
      paddingLeft: "20px",
      paddingRight: "20px",

      [theme.breakpoints.up("smPlus")]: {
        paddingLeft: "60px",
        paddingRight: "60px",
      },
    },
  })
);