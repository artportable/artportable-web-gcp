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
      fontSize: "10px",
      borderRadius: "20px",
      color: "black",
      height: "20px",
      width: "auto",
      
    },
  })
);
