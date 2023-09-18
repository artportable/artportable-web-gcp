import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      marginRight: "5px",
      marginBottom: "5px",
    },
    smallTag: {
      backgroundColor: "transparent",
      border: "1px solid #3e3e3e",
      margin: "1px",
      fontSize: "0.8em",
      borderRadius: "20px",
      color: "#3e3e3e",
      height: "20px",
      width: "auto",
      filter: "drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.2))",
    },
  })
);
