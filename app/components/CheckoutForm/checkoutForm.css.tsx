import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const checkoutFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    resultMessage: {
      color: "var(--ion-color-success)",
    },
    cardElementContainer: {
      height: "32px",
      paddingTop: "2px",
      paddingLeft: "1px",
    },
    cardErrorContainer: {
      height: "20px",
      color: "var(--ion-color-danger)",
    },
    subtotal: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    product: {
      display: "flex",
      justifyContent: "space-between",
    },
    divider: {
      borderBottom: "solid 1px black",
    },
    button: {
      borderRadius: "30px",
      fontWeight: 500,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "white",
      border: "1px solid black",
      color: "black",
      width: "150px",
      height: "30px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      marginTop: "0px",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "14px",
      },
    },
    
  })
);
