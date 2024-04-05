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
  })
);
