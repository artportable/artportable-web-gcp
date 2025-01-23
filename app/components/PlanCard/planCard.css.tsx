import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
      marginTop: "20px",
      border: "1px solid black",
      margin: "10px",
      borderRadius: "20px",
      [theme.breakpoints.up("md")]: {
        width: "30vw",
      },
    },
    cardRoot: {
      [theme.breakpoints.up("md")]: {},
    },
    header: {
      fontWeight: 500,
      fontSize: "1.5rem",
      display: "flex",
      color: "white",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    planPrice: {
      color: "black",
    },
    primaryCard: {
      margin: theme.spacing(0, 0),
    },
    textField: {
      // minHeight: "76px",
      // "& label.Mui-focused": {
      //   color: "black",
      // },
      // "& .MuiOutlinedInput-root": {
      //   "&.Mui-focused & fieldset": {
      //     // borderColor: 'black',
      //   },
      //   "&.Mui-focused fieldset": {
      //     border: "1px solid black",
      //   },
      // },
    },
    button: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: theme.spacing(3),
    },
  })
);
