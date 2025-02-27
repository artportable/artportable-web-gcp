import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    viewPortfolio: {
      marginTop: "40px",
    },
    bioText: {
      display: "inline-block",
      overflowWrap: "break-word",
      wordBreak: "break-word",
      fontFamily: "Joan",
      [theme.breakpoints.up("md")]: {
        maxWidth: "35vw",
      },
    },
  })
);
