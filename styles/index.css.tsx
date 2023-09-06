import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { rowGap } from "../app/utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    loadingContainer: {
      margin: "auto",
      marginTop: theme.spacing(4),
    },
    discoverContainer: {
      position: "relative",
      paddingTop: theme.spacing(0),
    },
    tabContainer: {
      display: "flex",
      flexDirection: "column",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    textField: {
      height: "35px",
      marginBottom: "10px",
      "& .MuiSelect-select:focus": {
        backgroundColor: "var(--background-color)",
      },
      "& label.Mui-focused": {
        color: "black",
      },
      "& .MuiOutlinedInput-root": {
        height: "35px",
        borderRadius: "16px",
        minWidth: "110px",
        width: "110px",
        maxWidth: "110px",

        "&.Mui-focused fieldset": {
          border: "1px solid black",
        },
      },
    },
    panel: {
      width: "50%",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundSize: "cover", // make sure the image covers the div
      backgroundRepeat: "no-repeat", // prevent the image from repeating
      backgroundPosition: "top", // center the image in the div
      filter: "drop-shadow(0 2px 3px rgba(25, 25, 25, 0.25))",
      cursor: "pointer",
      borderRadius: "15px",
      border: "1px solid transparent",
      marginRight: "10px",
      marginBottom: "6px",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url("https://artportableprod.blob.core.windows.net/artportable-prod/images/389e4fa4-23d1-49cf-aefb-fcb5979e7a84.jpg")`,

      [theme.breakpoints.up("smPlus")]: {
        width: "25%",
        height: "80px",
      },
    },

    activePanel: {
      backgroundColor: "#3e3e3e",
      backgroundImage: `none !important`,
    },

    carouselItem: {
      fontSize: "14px",
      fontWeight: 600,
      color: "white",
      fontStyle: "gotham",
      borderRadius: "6px",
      padding: "10px",
      filter: "drop-shadow(0 2px 3px rgba(25, 25, 25, 0.5))",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "22px",
        fontWeight: 600,
      },
    },

    carouselItemTag: {
      fontSize: "14px",
      fontWeight: 600,
      color: "white",
      fontStyle: "gotham",
      borderRadius: "6px",
      padding: "10px",
      filter: "drop-shadow(0 2px 3px rgba(25, 25, 25, 0.5))",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "22px",
        fontWeight: 600,
      },
    },

    closeButton: {
      position: "absolute",
      top: "5px",
      right: "5px",
      backgroundColor: "transparent",
      border: "2px solid #faf3ee",
      color: "white",
      cursor: "pointer",
      borderRadius: "50%",
      fontSize: "18px",
      lineHeight: "18px",
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10, // make sure it stays on top
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)", // add subtle shadow for depth
      transition: "transform 0.2s, backgroundColor 0.2s", // subtle transition for button interactions
      "&:hover": {
        transform: "scale(1.1)", // slight scale up on hover
      },
      "&:active": {
        transform: "scale(0.95)", // slight scale down on click
      },
    },

    flickingWrapper: {
      position: "relative", // Ensures absolutely positioned children are relative to this
      zIndex: 1,
      width: "95%",
      filter: "drop-shadow(0 2px 3px rgba(25, 25, 25, 0.25))",
      backgroundColor: "transparent",
    },

    flickingArrow: {
      position: "absolute",
      top: "70px",
      width: "94%",
      left: 10,
      right: 10,
      transform: "translateY(-50%)", // Centering the container vertically
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center", // Vertical centering for children
      pointerEvents: "none", // The container won't block other elements
      zIndex: 10,
      backgroundColor: "transparent",
    },

    flickingArrowPrev: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        cursor: "pointer",
        pointerEvents: "auto",
        color: "#3d3d44c4",
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        padding: "10px",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        filter: "drop-shadow(0 2px 3px rgba(25, 25, 25, 0.25))",
        "&:hover": {
          transform: "scale(1.1)", // slight scale up on hover
        },
      },
    },

    flickingArrowNext: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        cursor: "pointer",
        pointerEvents: "auto",
        color: "#3d3d44c4",
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        padding: "10px",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        filter: "drop-shadow(0 2px 3px rgba(25, 25, 25, 0.25))",
        "&:hover": {
          transform: "scale(1.1)", // slight scale up on hover
        },
      },
    },

    flickingArrowExpand: {
      position: "absolute",
      cursor: "pointer",
      top: "53px",
      left: 0,
      right: 0,
      width: "100%",
      transform: "translateY(-50%)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      pointerEvents: "none",
      zIndex: 10,
      marginTop: "10px",
      filter: "drop-shadow(0 2px 3px rgba(25, 25, 25, 0.25))",
      [theme.breakpoints.up("smPlus")]: {
        position: "absolute",
        cursor: "pointer",
        top: "63px",
        left: 0,
        right: 0,
        width: "100%",
        transform: "translateY(-50%)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 10,
        marginTop: "10px",
      },
    },
    expandMoreWrapper: {
      display: "flex",
      alignItems: "center",
      color: "black",
      justifyContent: "space-around",
      cursor: "pointer !important",
      backgroundColor: "white",
      borderRadius: "6px",
      width: "40px",
      height: "60px",
      filter: "drop-shadow(0 2px 3px rgba(25, 25, 25, 0.25))",
      zIndex: 10,
      "&:hover": {
        border: "1px solid #ff8383",
        color: "white",
        backgroundColor: "#ff8383", // secondary color for hover
        transform: "scale(1.09)", // slight scale up on hover
      },
      [theme.breakpoints.up("sm")]: {
        width: "40px",
        height: "60px",
      },
      [theme.breakpoints.up("smPlus")]: {
        width: "50px",
        right: 100,
        height: "80px",
      },
      [theme.breakpoints.up("md")]: {
        width: "40px",
        height: "80px",
      },
      [theme.breakpoints.up("mdPlus")]: {
        width: "50px",
        height: "80px",
      },
      [theme.breakpoints.up("lg")]: {
        width: "60px",
        height: "80px",
      },
    },
    expandMore: {
      cursor: "pointer",
      pointerEvents: "auto",
      color: "#8f7f7f",
      "&:hover": {
        border: "1px solid #ff8383",
        color: "white",
        backgroundColor: "#ff8383", // secondary color for hover
        transform: "scale(1.09)", // slight scale up on hover
      },
      [theme.breakpoints.up("sm")]: {
        width: "30px",
      },
      [theme.breakpoints.up("smPlus")]: {
        width: "20px",
      },
      [theme.breakpoints.up("md")]: {
        width: "20px",
      },
      [theme.breakpoints.up("mdPlus")]: {
        width: "20px",
      },
      [theme.breakpoints.up("lg")]: {
        width: "30px",
      },
    },
    expandMoreLess: {
      cursor: "pointer",
      pointerEvents: "auto",
      display: "none",
      alignItems: "center",
    },

    expanedTagsWrapper: {
      position: "relative",
      display: "flex",
    },

    expanedTags: {
      marginTop: "20px",
      position: "absolute",
      top: "100%",
      left: "auto",
      right: "0",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      borderRadius: "6px",
      zIndex: 10,
      backgroundColor: "#faf3ee",
      width: "100%",
      maxHeight: "500px",
      overflowY: "auto",
      padding: "20px",
      [theme.breakpoints.up("sm")]: {
        width: "100%",
        maxHeight: "600px",
      },
      [theme.breakpoints.up("smPlus")]: {
        width: "100%",
        maxHeight: "400px",
      },
      [theme.breakpoints.up("md")]: {
        width: "70%",
        maxHeight: "300px",
      },
    },
    tagDialog: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      minWidth: "22.66%",
      boxSizing: "border-box",
      padding: "5px",
      borderRadius: "3px",
      cursor: "pointer",
      margin: theme.spacing(1),
      height: "60px",
      backgroundColor: "#3e3e3e",
      color: "white",
      fontSize: "8px",
      fontWeight: 500,
      filter: "drop-shadow(0 2px 3px rgba(25, 25, 25, 0.25))",
      "&:hover": {
        color: "white",
        backgroundColor: "#a35d5d", // secondary color for hover
        transform: "scale(1.09)", // slight scale up on hover
        filter: "drop-shadow(0 2px 3px rgba(25, 25, 25, 0.25))",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "12px",
      },
    },

    tag: {
      flex: 1,
      minWidth: "16.66%",
      boxSizing: "border-box",
      padding: "5px",
      textAlign: "center",
      borderRadius: "12px",
      cursor: "pointer",
      margin: theme.spacing(1),
      "&:hover": {
        color: "white",
        backgroundColor: "#ff8383", // secondary color for hover
        transform: "scale(1.09)", // slight scale up on hover
      },
    },

    activePanelTagsDrop: {
      color: "#faf3ee",
      border: "0px solid #ff8383",
      backgroundImage: `none !important`,
      backgroundColor: "#ff8383",
    },

    textFieldFlex: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
      marginBottom: "10px",
    },
    artTabs: {
      "& .MuiTabs-scroller": {
        flexGrow: "0",
      },
      "& .MuiTab-root": {
        minWidth: 0,
      },
      "& .MuiTabScrollButton-root": {
        width: "unset",
        opacity: "0.8",
      },
      justifyContent: "center",
      width: "100%",
    },
    artistTab: {
      "& .MuiTabs-scroller": {
        flexGrow: "0",
      },
      "& .MuiTab-root": {
        minWidth: 0,
      },
      "& .MuiTabScrollButton-root": {
        width: "unset",
        opacity: "0.8",
      },
      justifyContent: "center",
      width: "100%",
      marginTop: "45px",
    },
    text: {
      minWidth: 0,
    },

    [theme.breakpoints.up("lg")]: {
      artTabs: {
        "& .MuiTabScrollButton-root": {
          display: "none",
        },
      },
      artistTab: {
        "& .MuiTabScrollButton-root": {
          display: "none",
        },
      },

      textField: {
        marginBottom: "0",
      },
    },

    [theme.breakpoints.up("lgPlus")]: {
      tabContainer: {
        flexDirection: "row",
      },
      textFieldFlex: {
        marginBottom: "0",
      },
      form: {
        marginTop: "7px",
        alignSelf: "center",
      },
      artTabs: {
        marginLeft: "-110px",
        "& .MuiTabScrollButton-root": {
          display: "none",
        },
      },
      artistTab: {
        marginLeft: "0",
        marginTop: "0",
        "& .MuiTabScrollButton-root": {
          display: "none",
        },
        text: {
          marginRight: theme.spacing(2),
          marginLeft: theme.spacing(2),
        },
      },
    },
  })
);
