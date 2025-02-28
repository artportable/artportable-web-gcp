import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) => {
  return createStyles({
    container: {
      marginTop: "0px",
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("smPlus")]: {
        marginTop: "30px",
      },
    },
    title: {
      fontSize: "20px",
      fontFamily: "Roboto",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "32px",
      },
    },
    text: {
      fontSize: "13px",
      fontFamily: "Joan",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "20px",
      },
    },
  });
});
