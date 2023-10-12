import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    displayTitle: {
      zIndex: 10,
      color: "#3e3e3e",
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "28px",
      marginTop: "20px",
      width: "95%",
      [theme.breakpoints.up("xs")]: {
        fontSize: "14px",
        fontWeight: 700,
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "18px",
        fontWeight: 700,
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "20px",
        fontWeight: 700,
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "22px",
        fontWeight: 700,
      },
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "24px",
        fontWeight: 700,
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "24px",
        fontWeight: 700,
      },
    },
    displayText: {
      zIndex: 10,
      color: "#3e3e3e",
      fontWeight: 400,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      fontSize: "12px",
      marginTop: "10px",
      width: "95%",
      fontStyle: "italic",
      [theme.breakpoints.up("xs")]: {
        fontSize: "12px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
        right: "0px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "14px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
        right: "0px",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "22px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
        right: "0px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "22px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
        right: "35px",
      },
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "22px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
        right: "35px",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "22px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
        right: "40px",
      },
    },

    toggleFiltersButton: {
      display: "block",
      [theme.breakpoints.up("smPlus")]: {
        display: "none"
      },

    },

    selectWrapper: {
      display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
    },

    trendAndTechnique: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      [theme.breakpoints.up("sm")]: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
      },
    },

    formatSizePrice: {
      display: 'flex',
      flexWrap: 'wrap',
    },

    selectStyle: {
      padding: "8px",
      border: "1px solid black",
      borderRadius: "20px",
      margin: "0px 0px 0px 4px",
      textAlign: "center",
      cursor: "pointer",
      fontWeight: "bold",
      maxWidth: "300px",
      backgroundColor: "#c67777",

    },

    selectStyleDesktop: {
      padding: "8px",
      border: "1px solid black",
      borderRadius: "20px",
      margin: "0px 0px 0px 12px",
      textAlign: "center",
      cursor: "pointer",
      fontWeight: "bold",
      maxWidth: "300px",
      backgroundColor: "transparent"
    },

    clearButton: {
      backgroundColor: "transparent",
      borderRadius: "20px",
      border: "1px solid black",
      cursor: "pointer",
      padding: "4px 6px 4px 6px",
      marginLeft: "4px",

    },
    selectedTagWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',

      backgroundColor: "transparent"
    },
    selectedTags: {
      display: "flex",
      marginTop: "10px",
      flexDirection: "column-reverse",
      padding: "10px",
    },

    selectedTagsDesktop: {
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
        backgroundColor: 'rgba(0,0, 0, 0.05)'
      }
    },
    removeTagButton: {
      display: 'flex',
      alignItems: 'center',
      cursor: "pointer",
    },

    displayTextLatest: {
      zIndex: 10,
      color: "#3e3e3e",
      fontWeight: 400,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      fontSize: "12px",
      marginTop: "10px",
      width: "95%",
      fontStyle: "italic",
      [theme.breakpoints.up("xs")]: {
        fontSize: "12px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "14px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "16px",
        fontWeight: 400,
        width: "auto",
        position: "relative",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "18px",
        fontWeight: 400,
      },
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "20px",
        fontWeight: 400,
        width: "auto",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "22px",
        fontWeight: 400,
        width: "auto",
      },
    },
  })
);
