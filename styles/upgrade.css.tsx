import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import { relative } from "node:path";
import { rowGap, columnGap } from "../app/utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    paymentOptions: {
      gridArea: "paymentOptions",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "black",
    },
    planCards: {
      display: "grid",
      gridAutoFlow: "row",
      margin: theme.spacing(4, 2, 0, 2),
      gap: theme.spacing(4),
      justifyContent: "center",
      alignItems: "stretch",
      [theme.breakpoints.up("md")]: {
        gridAutoFlow: "column",
      },
    },
    joinCommunityButton: {
      margin: theme.spacing(4),
      display: "flex",
      justifyContent: "center",
      "& button": {
        flexGrow: 1,
        maxWidth: "280px",
      },
    },
  })
);
