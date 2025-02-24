import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: "Roboto",
      fontWeight: 600,
    },
    rounded: {
      borderRadius: "20px",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    underlined: {
      textDecoration: "underline",
    },
  })
);
