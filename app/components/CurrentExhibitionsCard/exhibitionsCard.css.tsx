import { makeStyles, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme) =>
  createStyles({
    exhibition: {
      display: "flex",
      marginBottom: "10px",
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(0),
    },
    datesRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      overflow: "visible",
      marginRight: "5px",
    },
    dates: {
      fontStyle: "italic",
      color: "grey",
    },
    location: {
      marginLeft: theme.spacing(-0.2),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    locationText: {
      fontStyle: "italic",
      marginBottom: "1px",
    },
    displayNone: {
      display: "none",
    },
  })
);
