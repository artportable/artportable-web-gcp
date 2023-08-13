import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      marginRight: "5px",
      marginBottom: "5px",
    },
    smallTag: {
      backgroundColor: "transparent",
      border: "1px solid #c67777",
      margin: "1px",
      fontSize: "10px",
      borderRadius: "20px",
      color: "#c67777",
      height: "20px",
      width: "auto",
    },
  })
);
