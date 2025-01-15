import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    activeButtons: {
      display: "flex",
      justifyContent: "center",
      dropShadow: "rgba(0, 0, 0, 0.25)",
      gap: "10px",
      marginTop: "20px",
      [theme.breakpoints.up("smPlus")]: {
        justifyContent: "flex-end",
        marginTop: "10px",
      },
    },
    mobileButton: {
      width: "50%",
      borderRadius: "20px",
      margin: "2px",
      [theme.breakpoints.up("smPlus")]: {
        width: "30%",
      },
      [theme.breakpoints.up("md")]: {
        width: "20%",
      },
    },
    activeFilterClearOnScreen: {
      margin: "2px",
      backgroundColor: "transparent",
      borderRadius: "20px",
      padding: "10px",
      border: "1px solid rgb(0 0 0 / 23%)",
      color: "black",
      width: "50%",
      height: "40px",
      [theme.breakpoints.up("smPlus")]: {
        width: "30%",
      },
      [theme.breakpoints.up("md")]: {
        width: "20%",
      },
    },

    dialogContainer: {
      dropShadow: "rgba(0, 0, 0, 0.25)",
      marginTop: "115px",
      [theme.breakpoints.up("smPlus")]: {
        width: "300px",
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
    mobileList: {
      flexGrow: 1,
    },
    filterTitleClose: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "18px",
      fontWeight: "normal",
      width: "80%",
      margin: "0 auto",
      alignItems: "normal",
      marginTop: "20px",
    },
    // class to wrap the formControll, select and div
    formControllWrapper: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
    },
    // the class for the title above the select
    filtertitle: {
      display: "flex",
      alignItems: "flex-end",
      fontSize: "20px",
      color: "black",
      width: "80%",
      margin: "0 auto",
      marginTop: "10px",
    },
    // the class for the formControl
    formControl: {
      marginTop: "10px",
      margin: "0px",
      alignItems: "center",
      width: "100%",
    },
    // the class for select menu
    selectMenu: {
      width: "338px",
      backgroundColor: "white",
      height: "40px",
      borderRadius: "10px",
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
      "& ul": {
        backgroundColor: "red",
      },
      [theme.breakpoints.up("smPlus")]: {
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
      borderRadius: "10px",
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
      color: "black",
      width: "330px",
      [theme.breakpoints.up("smPlus")]: {
        width: "260px",
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
      width: "100%",
      marginBottom: "60px",
    },
    activeFilter: {
      display: "flex",
      backgroundColor: "transparent",
      justifyContent: "space-evenly",
      padding: "10px",
      margin: "20px",
      gap: "10px",
    },
    activeFilterClear: {
      backgroundColor: "transparent",
      borderRadius: "20px",
      padding: "10px",
      border: "1px solid black",
      color: "black",
      width: "125px",
      height: "40px",
    },

    activeFilterResult: {
      backgroundColor: "black",
      borderRadius: "20px",
      padding: "10px",
      color: "white",
      width: "125px",
      height: "40px",
      marginBottom: "60px",
      "&:hover": {
        backgroundColor: "#e0e0e0", // Highlight color on hover
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
