import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { rowGap } from "../app/utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    loadingContainer: {
      margin: "auto",
      marginTop: theme.spacing(4),
    },
    discoverContainer: {
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
      width: "40%",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundSize: "cover", // make sure the image covers the div
      backgroundRepeat: "no-repeat", // prevent the image from repeating
      backgroundPosition: "top", // center the image in the div
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
      border: "1px solid lightgray", // added style and color
      borderRadius: "15px",
      marginRight: "10px",
      marginBottom: "6px",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://artportableprod.blob.core.windows.net/artportable-prod/images/389e4fa4-23d1-49cf-aefb-fcb5979e7a84.jpg")`,

      [theme.breakpoints.up("smPlus")]: {
        width: "20%",
        height: "80px",
      },
    },

    activePanel: {
      backgroundColor: "#ff8383",
      border: "2px solid #ff8383",
      backgroundImage: `none !important`,
    },

    carouselItem: {
      fontSize: "18px",
      color: "white",
      fontStyle: "gotham",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "15px",
      },
    },

    carouselItemTag: {
      fontSize: "10px",
      color: "#ff8383",
      fontStyle: "gotham",
      overflow: "hidden",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "15px",
      },
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
