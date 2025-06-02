import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const checkoutFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      width: "100%",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: 600,
      color: "#000000",
      marginBottom: "24px",
    },
    fieldGroup: {
      marginBottom: "10px",
      width: "100%",
    },
    fieldLabel: {
      display: "block",
      fontSize: "14px",
      fontWeight: 500,
      color: "#000000",
      marginBottom: "8px",
    },
    fieldRow: {
      display: "flex",
      gap: "16px",
      marginBottom: "20px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        gap: "20px",
      },
    },
    cardElementContainer: {
      width: "100%",

      border: "1px solid black",
      borderRadius: "4px",
      backgroundColor: "#ffffff",
  
      display: "flex",
      alignItems: "center",
      "&:focus-within": {
        borderColor: "#000000",
        outline: "none",
      },
      "& .StripeElement": {
        width: "100%",
        height: "100%",
      },
    },
    textInput: {
      width: "100%",
      padding: "12px 16px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
      backgroundColor: "#ffffff",
      outline: "none",
      "&:focus": {
        borderColor: "#000000",
      },
      "&::placeholder": {
        color: "#aab7c4",
      },
    },
    paymentIcons: {
      display: "flex",
      gap: "8px",
      marginBottom: "20px",
      marginTop: "8px",
    },
    paymentIcon: {
      height: "24px",
      width: "auto",
    },
    cardErrorContainer: {
      color: "#e53e3e",
      fontSize: "14px",
      marginTop: "8px",
      marginBottom: "16px",
    },
    buttonContainer: {
      marginTop: "32px",
      display: "flex",
      justifyContent: "center",
    },
    payButton: {
      borderRadius: "30px",
      fontWeight: 500,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "white",
      border: "1px solid black",
      color: "black",
      width: "150px",
      height: "40px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "14px",
      },
      "&:disabled": {
        backgroundColor: "#cccccc",
        cursor: "not-allowed",
      },
    },
    // Legacy styles (keeping for compatibility)
    resultMessage: {
      color: "var(--ion-color-success)",
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
