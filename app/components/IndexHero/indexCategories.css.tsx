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
      padding: "0px 30px 0px 30px",
      height: "100%",
      [theme.breakpoints.up("smPlus")]: {
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        padding: "0 80px",
        height: "100%",
      },
      [theme.breakpoints.up("md")]: {},
    },
    item: {
      width: "170px",
      height: "100px",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.up("smPlus")]: {
        width: "250px",
        height: "160px",
      },
    },
    category: {
      position: "absolute",
      bottom: "0px",
      left: "0px",
      background:
        "linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
      color: "black",
      width: "100%",
      textAlign: "left",
      padding: "8px",
    },
  })
);
