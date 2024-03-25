import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(1),
    },
    cardRoot: {
      backgroundColor: "#fffffff0",
      "& .MuiCardContent-root": {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "& .MuiList-root": {
          flexGrow: 1,
        },
        "& a": {
          alignSelf: "center",
        },
        "& .MuiButton-root": {
          minWidth: "155px",
        },
      },
      [theme.breakpoints.up("md")]: {
        marginTop: theme.spacing(3),
      },
    },
    header: {
      fontWeight: 500,
      fontSize: "1.5rem",
      backgroundColor: "#F7E2A8",
      height: "50px",
      display: "flex",
      justifyContent: "center",

      alignItems: "center",
      borderRadius: "6px",
      margin: "10px",
    },
    planPrice: {
      color: "black",
    },
    primaryCard: {
      margin: theme.spacing(0, 0),
    },
    textField: {
      minHeight: "76px",
      "& label.Mui-focused": {
        color: "black",
      },
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused & fieldset": {
          // borderColor: 'black',
        },
        "&.Mui-focused fieldset": {
          border: "1px solid black",
        },
      },
    },
    button: {
      display: "flex",
      margin: "auto",
      marginTop: theme.spacing(3),
      float: "right",
    },
    h3: {
      textAlign: "left",
      marginBottom: "-20px",

      minHeight: "76px",
    },
  })
);
