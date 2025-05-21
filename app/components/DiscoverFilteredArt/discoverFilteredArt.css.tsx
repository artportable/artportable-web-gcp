import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    activeButtons: {
      display: "flex",
      dropShadow: "rgba(0, 0, 0, 0.25)",
      gap: "10px",
      [theme.breakpoints.up("smPlus")]: {},
    },
    mobileButton: {
      borderRadius: "30px",
      fontWeight: 400,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "#f1f1f1",
      border: "1px solid black",
      color: "black",
      width: "150px",
      height: "35px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "14px",
        marginLeft: "10px",
      },
    },
    activeFilterClearOnScreen: {
      borderRadius: "30px",
      fontWeight: 400,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "#f1f1f1",
      border: "1px solid black",
      color: "black",
      width: "150px",
      height: "35px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      marginLeft: "10px",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "14px",
      },
    },

    buttonsOne: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      [theme.breakpoints.up("smPlus")]: {
        flexDirection: "column",     alignItems: "flex-start",
      },
    },

    dialogContainer: {
      dropShadow: "rgba(0, 0, 0, 0.25)",
      marginTop: "115px",
      zIndex: 0,
      height: '100%',
      "& .MuiDialog-paper": {
        margin: 0,
        maxHeight: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
      },
      [theme.breakpoints.up("md")]: {
        zIndex: 0,
        width: "320px",
        "&::-webkit-scrollbar": {
          width: "1px !important",
          height: "1px",
        },
        overflow: "auto !important",
        "& .MuiDialog-paper": {
          dropShadow: "rgba(0, 0, 0, 0.25)",
          "&::-webkit-scrollbar": {
            width: "2px !important",
            height: "2px !important",
            overflowY: "hidden !important",
            overflow: "hidden !important",
          },
        },
      },
    },

    dialogContent: {
      flex: 1,
      overflowY: 'auto',
      paddingBottom: '120px',
      WebkitOverflowScrolling: 'touch',
      "&::-webkit-scrollbar": {
        width: "2px !important",
        height: "1px",
        backgroundColor: "#FCF7EC",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "black",
      },
      [theme.breakpoints.up("smPlus")]: {
        marginBottom: '80px',
      },
    },
    chipStack: {
      display: "flex",
      flexDirection: "row",
      gap: "10px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: 'wrap',
      [theme.breakpoints.up("smPlus")]: {
        flexDirection: "row",
        flexWrap: 'wrap',
        padding: '0 20px',
        justifyContent: "flex-start",
      }
    },
    chipStyle: {
      borderRadius: '0px !important',
      backgroundColor: 'white',
      color: 'white',
      margin: '2px 0',
      '& .MuiChip-deleteIcon': {
        backgroundColor: 'transparent',
        color: '#666363',
        fontSize: "15px",
        '&:hover': {
          backgroundColor: 'transparent',
          color: 'blue',
        }
      },
      '&.MuiChip-root': {
        borderRadius: '0px !important',
      },
      height: '32px',
      '& .MuiChip-label': {
        borderRadius: '0px !important',
        padding: '0 12px',
        color: "#222222",
        fontSize: '12px'
      },
      '&.MuiChip-filled': {
        borderRadius: '0px !important',
        backgroundColor: '#f1f1f1',
        border: "1px solid #222222",
      },
      '&.MuiChip-outlined': {
        borderRadius: '0px !important'
      }
    },
    mobileList: {
      flexGrow: 1,
      overflowY: 'visible',
    },
    filterTitleClose: {
      fontFamily: "Roboto",
      display: "flex",
      justifyContent: "space-between",
      fontSize: "18px",
      fontWeight: "normal",
      width: "100%",
      margin: "0 auto",
      alignItems: "normal",
      backgroundColor: "white",
    },

    formControllWrapper: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      overflowY: 'visible',
      marginBottom: "50px",
    },

    filtertitle: {
      fontFamily: "Roboto",
      display: "flex",
      alignItems: "flex-end",
      fontSize: "14px",
      color: "black",
      width: "100%",
      margin: "0 auto",
      marginTop: "20px",
      fontWeight: 400,
      [theme.breakpoints.up("smPlus")]: {
        width: "100%",
        fontSize: "16px",
        
      },
    },

    filtertitleTop: {
      fontFamily: "Roboto",
      display: "flex",
      alignItems: "flex-end",
      fontSize: "14px",
      color: "black",
      width: "100%",
      margin: "0 auto",
   
      fontWeight: 400,
      [theme.breakpoints.up("smPlus")]: {
        width: "100%",
        fontSize: "16px",
        
      },
    },

    formControl: {
      marginTop: "10px",
      margin: "0px",
      alignItems: "flex-start",
   
    },
    // the class for select menu
    selectMenu: {
      fontFamily: "Roboto",
      width: "338px",
      backgroundColor: "white",
      height: "40px",
      borderRadius: "0px",
      border: "1px solid black",
      boxShadow: "none !important",
      "& .MuiSelect-root": {
        border: "none !important",
        boxShadow: "none !important",
      },
      "& .MuiInputBase-root": {
        border: "black !important",
        boxShadow: "none !important",
      },
      "& .MuiInput-underline:before, & .MuiInput-underline:after": {
        display: "none !important",
      },
      "& .MuiSelect-select": {
        margin: "6px",
        textAlign: "left",
      },
      "& .MuiInputBase-input": {
        textAlign: "left",
        margin: "6px",
      },
      "& ul": {},
      [theme.breakpoints.up("md")]: {
        width: "270px",
      },
    },
    orientation: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      width: "338px",
      margin: "0 auto",
      marginTop: "10px",
      [theme.breakpoints.up("smPlus")]: {
        width: "270px",
      },
    },
    popoverPaper: {
      backgroundColor: "blue", // Custom background color
      borderRadius: "10px", // Rounded corners
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Custom shadow
      minWidth: "100vw", // Minimum width
      padding: "10px", // Padding for inner spacing
      border: "1px solid #ddd", // Border style,
      "& ul": {
        backgroundColor: "red",
      },
    },
    menuList: {
      backgroundColor: "blue",
      padding: "0", // Remove extra padding from the list
      "& li": {
        padding: "10px 20px", // Custom padding for list items
        color: "red", // Custom text color
        "&:hover": {
          backgroundColor: "#e0e0e0", // Highlight color on hover
        },
        "&.Mui-selected": {
          backgroundColor: "#d0f0c0", // Selected item background color
          color: "#000", // Selected item text color
        },
      },
      "& ul": {
        backgroundColor: "red",
      },
    },
    format: {
      border: "1px solid black",
      padding: "6px",
      width: "240px",
 
      height: "35px",
      marginBottom: "10px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },

    sizeFilterContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "338px",
      margin: "0 auto",
      marginTop: "10px",
    },
    sizeWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "10px",
    },

    sizeTitle: {
      border: "1px solid black",
      padding: "6px",
      width: "160px",
      borderRadius: "10px",
      height: "30px",
    },

    slider: {
      color: "#222222",
      width: "310px !important",
      height: "1px",
      [theme.breakpoints.up("smPlus")]: {
        width: "250px !important",
      },
    },
    cancelPresentationIcon: {
      marginLeft: "6px",
    },
    mobileAccordion: {
      borderRadius: "0px !important",
      width: "100%",
      alignItems: "center",
      backgroundColor: "transparent",
    },
    mobileTitleIcon: {
      display: "flex",
      alignItems: "flex-end",
      fontSize: "20px",
      color: "black",
    },
    mobileIcon: {
      marginRight: "4px",
    },
    mobileTemp: {
      fontWeight: "bold",
    },
    mobileOverflow: {
      maxHeight: "300px",
      overflowY: "auto",
    },
    mobileTag: {
      fontSize: "12px",
      fontWeight: "lighter",
    },
    highlightIcon: {
      color: "#c67777",
      alignItems: "center",
      fontSize: "12px",
    },
    mobileSummary: {
      height: "100%",
    },
    activeFilterContainer: {
      position: 'sticky',
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
      backgroundColor: "#F1F1F1",
      borderTop: "1px solid #ddd",
      zIndex: 1,
    },
    activeFilter: {
      display: "flex",
      backgroundColor: "transparent",
      justifyContent: "space-evenly",
      padding: "10px",
      gap: "10px",
    },
    activeFilterClear: {
      borderRadius: "30px",
      fontWeight: 400,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "#f1f1f1",
      border: "1px solid black",
      color: "black",
      width: "150px",
      height: "35px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      marginLeft: "10px",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "14px",
      },
    },

    activeFilterResult: {
      borderRadius: "30px",
      fontWeight: 400,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "#f1f1f1",
      border: "1px solid black",
      color: "black",
      width: "150px",
      height: "35px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      marginLeft: "10px",
      marginBottom: "60px",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "14px",
      },
    },
    tuneIcon: {
      marginLeft: "5px",
    },
    mobileContainer1: {
      marginBottom: "30px",
      position: "relative",
    },
    selectedTagContainer: {
      display: "flex",
    },
    selectedTags: {
      display: "flex",
      marginTop: "10px",
      flexDirection: "column-reverse",
      padding: "10px",
    },
    selectedTagWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
    },
  })
);
