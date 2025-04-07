import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    btnContainer: {
      display: "flex",
      alignItems: "center",
      margin: "20px",
      flexDirection: "column",
    },
    btn: {
      fontSize: "20px",
      backgroundColor: "black",
      borderRadius: "30px",
    },
  })
);
