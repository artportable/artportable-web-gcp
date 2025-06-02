import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row-reverse",
      },
    },
    leftSide: {
      display: "none", // Hidden on mobile by default
      [theme.breakpoints.up("md")]: {
        display: "block",
        width: "50%",
        backgroundColor: "#ffffff",
        height: "100vh",
      },
    },
    artisticContent: {
      width: "100%",
      height: "100%",
      padding: "0",
      margin: "0",
    },
    heroImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
    rightSide: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100vh",
      [theme.breakpoints.up("md")]: {
        width: "50%",
      },
    },
    formWrapper: {
      maxWidth: "500px",
      width: "100%",
      padding: "15px",
      [theme.breakpoints.up("md")]: {
        maxWidth: "600px",
        padding: "30px",
      },
    },
    stepIndicator: {
      fontSize: "14px",
      color: "#666666",
      textAlign: "center",
      marginBottom: "16px",
      fontWeight: 400,
    },
    mainHeading: {
      fontSize: "24px",
      fontWeight: 600,
      color: "#000000",
      textAlign: "center",
      marginBottom: "20px",
      lineHeight: "1.2",
      [theme.breakpoints.up("md")]: {
        fontSize: "28px",
        marginBottom: "24px",
      },
    },
    productSection: {
      marginBottom: "20px",
      [theme.breakpoints.up("md")]: {
        marginBottom: "24px",
      },
    },
    productLabel: {
      fontSize: "16px",
      fontWeight: 600,
      color: "#000000",
      marginBottom: "8px",
      [theme.breakpoints.up("md")]: {
        fontSize: "18px",
        marginBottom: "12px",
      },
    },
    productInfo: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: "12px",
      [theme.breakpoints.up("md")]: {
        paddingBottom: "16px",
      },
    },
    productName: {
      fontSize: "16px",
      color: "#000000",
      textDecoration: "underline",
      fontWeight: 400,
    },
    productPrice: {
      fontSize: "16px",
      color: "#000000",
      fontWeight: 400,
    },
    paymentSection: {
      "& .StripeElement": {
        width: "100%",
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: "#ffffff",
        fontSize: "16px",
        boxSizing: "border-box",
      },
      "& .StripeElement--focus": {
        borderColor: "#000000",
        outline: "none",
      },
      "& .StripeElement--invalid": {
        borderColor: "#fa755a",
      },
    },
    // Legacy styles (keeping for compatibility)
    container: {
      display: "none",
    },
    left: {
      display: "none",
    },
    right: {
      display: "none",
    },
    fillInText: {
      display: "none",
    },
    leftContent: {
      display: "none",
    },
    headlineDiv: {
      display: "none",
    },
    headline: {
      display: "none",
    },
    headlineText: {
      display: "none",
    },
    headlineMobile: {
      display: "none",
    },
    headlineDivMobile: {
      display: "none",
    },
    card: {
      display: "none",
    },
    cardContentWidth: {
      display: "none",
    },
    subtotal: {
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "solid 1px " + theme.palette.primary.main,
      marginBottom: "20px",
    },
    product: {
      display: "flex",
      justifyContent: "space-between",
    },
    logo: {
      display: "none",
    },
    stripe: {
      width: "300px",
    },
  })
);
