import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
      maxWidth: "40rem",
      margin: "auto",
    },
    cardRoot: {
      boxShadow: "0px 0px 11px 0px rgba(var(--ion-color-primary-rgb),0.75)",
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
      justifyContent: "center",
    },
    h3: {
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
      minHeight: "76px",
    },
  })
);
