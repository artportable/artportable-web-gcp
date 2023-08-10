import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
    },
    rounded: {
      borderRadius: "10px",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    underlined: {
      textDecoration: "underline",
    },
  })
);
