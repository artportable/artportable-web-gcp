import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    cardContent: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: theme.spacing(1),
      backgroundColor: "white",
      // marginTop: '-10px',
      [theme.breakpoints.up("md")]: {
        justifyContent: "left",
        padding: "10px 0",
      },
    },
    icon: {
      marginRight: "1px",
      display: "flex",
      alignItems: "center",
    },
    sitename: {
      display: "block",
      whiteSpace: "nowrap",
      width: "15em",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  })
);
