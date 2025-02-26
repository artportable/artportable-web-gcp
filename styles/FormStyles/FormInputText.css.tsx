import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const inputStyles = makeStyles((theme: Theme) =>
  createStyles({
    TextField: {
      paddingLeft: "8px",
      paddingRight: "20px",
      paddingBottom: "5px",
      paddingTop: "5px",
      maxHeight: "100px",
      height: "100%",
      width: "300px",
      maxWidth: "fill-available",
      fontFamily: "Roboto",
      fontSize: "16px",
      marginLeft: "20px",
      marginRight: "20px",
      [theme.breakpoints.up("smPlus")]: {
        paddingLeft: "20px",
        paddingBottom: "10px",
        paddingTop: "10px",
        maxHeight: "52px",
        marginLeft: "60px",
        marginRight: "60px",
      },
    },
  })
);
