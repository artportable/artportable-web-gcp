import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { relative } from "node:path";
import { rowGap, columnGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    portfolioGrid: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(4),
    },
    [theme.breakpoints.up("mdPlus")]: {
      portfolioGrid: {
        display: "grid",
        gap: theme.spacing(2),
        gridTemplate:
          '"      first     second     third"       auto' +
          "/        1fr        1fr        1fr",
      },
    },
    card: {
      overflow: "hidden",
      margin: "20px",
      background: "transparent",
    },
    imageGrid: {
      display: "grid",
      gap: "0px 0px",
      gridTemplate:
        '"first second" 100px ' + '"first second" 100px ' + "/ 50% 50%",
    },
    image: {
      objectFit: "cover",
      width: "100%",
      height: "100%",
    },
    first: {
      gridArea: "first",
      position: "relative",
    },
    second: {
      gridArea: "second",
      position: "relative",
    },
    third: {
      gridArea: "third",
      position: "relative",
    },
    forth: {
      gridArea: "forth",
      position: "relative",
    },
    fifth: {
      gridArea: "fifth",
      position: "relative",
    },
    footer: {
      display: "flex",
      gap: theme.spacing(1),
      flexDirection: "row",
      alignItems: "center",
      padding: theme.spacing(0.6, 0.6),
    },
    userLink: {
      textDecoration: "none",
      color: "primary",
    },
  })
);
