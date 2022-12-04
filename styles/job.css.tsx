import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      gridColumn: "1/4",
      position: "relative",
      top: "-35px",
    },
  })
);
