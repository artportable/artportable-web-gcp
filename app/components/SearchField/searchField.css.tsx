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
      height: "auto",
      maxHeight: "590px",
      padding: "30px",
      overflowY: "auto",
      backgroundColor: "white",
      zIndex: 10330,
  
      [theme.breakpoints.up("lg")]: {
        maxHeight: "450px",
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
        maxHeight: "none",
        paddingLeft: "20px", 
        marginTop: "0px",
      },
    },
    categoryTitle: {
      position: "absolute",
      bottom: "6px",
      left: "8px",
      color: "white",
      fontSize: "12px",
      fontWeight: 500,
      transition: "all 0.3s ease",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "18px",
        transform: "scale(1)",
        transformOrigin: "left bottom",
        "&:hover": {
          transform: "scale(1.05)",
        }
      },
    },
    categoriesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "8px",
      fontSize: "12px",
      [theme.breakpoints.up("smPlus")]: {
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "8px",
        fontSize: "12px",
      },
    },

    categoryItem: {
      textDecoration: "none",
       color: "inherit",
      position: "relative",
      width: "100%",
      height: "40px",
      overflow: "hidden",
      borderRadius: "4px",
                          cursor: "pointer",
                          [theme.breakpoints.up("smPlus")]: {
                            height: "120px",
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
    trendingItem: {
      padding: "8px 0",
      cursor: "pointer",
      fontSize: "14px",
      color: "#333",
      borderBottom: "1px solid #f0f0f0",
      transition: "color 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      "&:hover": {
        color: "rgb(167, 3, 1)",
      },
    },
  })
);
