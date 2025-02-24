import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: "100px",
      width: "100vw",
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      justifyContent: "center",
      gap: "15px",
      textAlign: "center",
      justifyItems: "center",
      padding: "0px 30px 0px 30px ",
      [theme.breakpoints.up("smPlus")]: {
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "40px",
        padding: "0 80px",
      },
      [theme.breakpoints.up("md")]: {},
    },
    item: {
      width: "170px",
      height: "100px",
      border: "1px solid pink",
      [theme.breakpoints.up("smPlus")]: {
        width: "250px",
        height: "160px",
      },
    },
  })
);
