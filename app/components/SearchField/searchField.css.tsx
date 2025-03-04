import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    inputContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      height: "38px",
      borderRadius: "20px",
      width: "100px", // Adjusted width to fit the icon
      cursor: "pointer",
      marginTop: "10px",
      marginBottom: "20px",
      marginLeft: "10px",
      [theme.breakpoints.up("smPlus")]: {
        marginBottom: "20px",
        width: "500px", // Full width for larger screens
        cursor: "default",
      },
    },
    button: {
      color: "black",
      fontWeight: 300,
      borderRadius: "20px",
      height: "35px",
      minWidth: "40px",
      fontSize: "12px",
      border: "1px solid black",
      marginRight: "0px",
      [theme.breakpoints.up("smPlus")]: {
        color: "black",
        fontWeight: 300,
        borderRadius: "20px",
        height: "40px",
        minWidth: "40px",
        fontSize: "12px",
        border: "1px solid black",
        marginRight: "50px",
      },
    },
    searchIcon: {},

    input: {
      height: "100%",
      width: "100%",
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: "Roboto",
      border: "none",
      autoFocus: "false",
      backgroundColor: "transparent",
      borderBottom: "1px solid #0000004f",

      "&:focus": {
        border: "none",
      },
      "&:focus-visible": {
        outline: "none",
      },

      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },

      [theme.breakpoints.up("md")]: {
        fontSize: "16px",
      },
      "@media not all and (min-resolution:.001dpcm)": {
        "@supports (-webkit-appearance:none)": {
          border: "none !important",
          boxShadow: "none !important",
        },
      },
    },
  })
);
