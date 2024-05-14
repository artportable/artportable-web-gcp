import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    filter: {
      backgroundColor: "transparent !important",
      margin: "10px !important",
      "& .MuiAccordionSummary-root.Mui-expanded": {
        minHeight: "auto", // Prevent filter header from changing position when open.
      },
      "& .MuiAccordionSummary-content.Mui-expanded": {
        margin: "12px 0", // Prevent filter header from changing position when open.
      },
      [theme.breakpoints.down('lg')]: {
        "& .MuiAccordionSummary-root": {
          padding: "0 12px", // Prevent last item to be alone on second row on medium devices.
        },
      },
    },

    filterSummary: {
      fontSize: "16px",
      margin: "0px 10px 0px 10px",
      fontWeight: 500,
      "&:hover": {
        opacity: 0.7,
      },
    },

    filterDetailsTags: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#fdf9f7",
      overflowY: "scroll",
      position: "absolute",
      zIndex: 1,
      paddingTop: "10px",
      paddingBottom: "10px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      maxHeight: "400px",
      fontSize: "10px",
      fontWeight: 500,
      borderRadius: "10px",
    },
    filterItemTags: {
      justifyContent: "start",
      width: "auto",
      paddingBottom: "6px",
      paddingTop: "6px",
      paddingRight: "16px",
      paddingLeft: "16px",
    },

    filterDetails: {
      display: "grid",
      gridTemplateColumns: "1fr",
      position: "absolute",
      backgroundColor: "#fdf9f7",
      zIndex: 1,
      padding: "10px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      fontSize: "15px",
      fontWeight: 500,
      borderRadius: "10px",
    },
    filterItem: {
      paddingBottom: "6px",
      paddingTop: "6px",
      paddingRight: "16px",
      paddingLeft: "16px",
      width: "200px",
      fontWeight: "lighter",
      fontSize: "12px",
    },
    filterIcon: {
      marginRight: "7px",
    },
    filterClearBtn: {
      margin: "6px",
      borderRadius: "20px",
      height: "30px",
      width: "100px",
      textAlign: "center",
      border: "1px solid black",
      color: "black",
      fontSize: "12px",
      padding: "1px",
    },
    selectedTagWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",

      backgroundColor: "transparent",
    },
    selectedTagsDesktop: {
      textAlign: "center",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      marginBottom: "10px",
      margin: "4px",
      border: "1px solid black",
      borderRadius: "20px",
      padding: "12px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgba(0,0, 0, 0.05)",
      },
    },
    removeTagButton: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
    desktopContainer: {
      display: "flex",
      flexFlow: "row wrap",
      // marginTop: "-40px",
      // marginBottom: "10px",
      marginTop: "-10px",
      marginBottom: "40px",
      width: "100%",
      // height: "60px",
      justifyContent: "center",
      alignItems: "center", // Make clear filters button aligned.
      [theme.breakpoints.down("smPlus")]: {
        display: "none",
      },
    },
  })
);
