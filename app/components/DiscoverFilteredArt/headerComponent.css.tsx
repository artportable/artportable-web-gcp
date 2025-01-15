import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "blue",
      color: "white",
      gridColumn: "1/4",
      padding: "30px",
    },
    titleWrapper: {
      fontSize: "26px",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "46px",
      },
    },
  })
);
