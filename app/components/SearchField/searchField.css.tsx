import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    inputContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      height: "38px",
      width: "60px",
      cursor: "pointer",
      marginTop: "10px",
      marginBottom: "20px",
      marginLeft: "5px",
      borderBottom: "1px solid rgb(184, 184, 184)",
      [theme.breakpoints.up("smPlus")]: {
        marginLeft: "10px",
        marginBottom: "20px",
        width: "300px",
        cursor: "default",
      },
      [theme.breakpoints.up("md")]: {
        marginLeft: "10px",
        marginBottom: "20px",
        width: "200px",
        cursor: "default",
      },
      [theme.breakpoints.up("lg")]: {
        marginLeft: "10px",
        marginBottom: "20px",
        width: "400px",
        cursor: "default",
      },
    },
    paper: {

      height: "590px",
      padding: "30px",
      overflowY: "auto",
      backgroundColor: "white",
      zIndex: 10330,
  
      [theme.breakpoints.up("lg")]: {
        height: "390px",
      },
    },  
    searchPopup: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px",  
      [theme.breakpoints.up("smPlus")]: {
        flexDirection: "row",
      },
    },
    categories: {
      flex: "0 0 60%", 
      marginTop: "50px",
      maxHeight: "300px",
      [theme.breakpoints.up("smPlus")]: {
        maxHeight: "300px",
        paddingLeft: "20px", 
        marginTop: "0px",
      },
    },
    button: {
      color: "black",
      fontWeight: 300,
      borderRadius: "20px",
      height: "35px",
      minWidth: "40px",
      fontSize: "12px",

      marginRight: "0px",
      [theme.breakpoints.up("smPlus")]: {
        color: "black",
        fontWeight: 300,
        borderRadius: "20px",
        height: "40px",
        minWidth: "40px",
        fontSize: "12px",
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
      border: "none !important",
      autoFocus: "false !important",
      backgroundColor: "transparent",
      borderBottom: "1px solid #0000004f",
      "&:focus": {
        border: "none !important",
      },
      "&:focus-visible": {
        outline: "none",
      },

      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },

      [theme.breakpoints.up("md")]: {
        fontSize: "14px",
      },
      "@media not all and (min-resolution:.001dpcm)": {
        "@supports (-webkit-appearance:none)": {
          border: "none !important",
          boxShadow: "none !important",
        },
      },
    },
    searchIconButton: {
      marginRight: "0px",
      color: "black",
      padding: "6px",
      "& svg": {
        width: "30px",
        height: "30px",
      },
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  })
);
