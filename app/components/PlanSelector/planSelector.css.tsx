import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    paymentOptions: {
      gridArea: "paymentOptions",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    planCards: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        width: "auto",
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
