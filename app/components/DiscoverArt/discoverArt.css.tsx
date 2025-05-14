import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { rowGap, columnGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    rowsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      ...columnGap(16),
    },
    row: {
      display: "flex",
      ...rowGap(16),
      justifyContent: "space-between",
      overflow: "hidden",
      paddingLeft: 50,
      paddingRight: 50,
      width: "100%",
      boxSizing: "border-box",
    },

    rowSkeleton: {
      display: "flex",
      margin: "10px",
      overflow: "hidden",
    },
    skeletonContainer: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("smPlus")]: {
        flexDirection: "row",
      },
    },

    skeletonColor: {
      backgroundColor: "transparent",
      [theme.breakpoints.up("smPlus")]: {
        backgroundColor: "var(--background-color-darker)",
      },
    },
    skeletonColorTwo: {
      backgroundColor: "var(--header-color)",
    },
    skeletonColorThree: {
      backgroundColor: "var(--skeleton-color)",
    },
    selected: {
      "& .MuiChip-root": {
        background: theme.palette.primary.dark,
        border: `1px solid ${theme.palette.primary.dark}`,
      },
    },
  })
);
