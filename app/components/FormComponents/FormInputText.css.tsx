import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    TextField: {
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingBottom: "5px",
      paddingTop: "5px",
      maxHeight: "80px",
      height: "100%",

      [theme.breakpoints.up("smPlus")]: {
        paddingLeft: "60px",
        paddingRight: "60px",
        paddingBottom: "10px",
        paddingTop: "10px",
        maxHeight: "52px",
        height: "100%",
      },
    },
  })
);
