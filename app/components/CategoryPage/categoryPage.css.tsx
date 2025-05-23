import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { rowGap, columnGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      alignItems: "flex-start",
      display: "flex",
      width: "100%",
      flexDirection: "row",
      ...columnGap(20),
      flexWrap: "wrap",
    },
    flexHeaderButton: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    articleLeadFlex: {
      alignSelf: "center",
    },
    container: {
      width: "100%",
    },
    wrapper: {
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
      },
    },
    headerDiv: {
      marginTop: "40px",
      marginBottom: "15px",
    },
    header: {
      fontFamily: "Roboto",
      fontWeight: 600,
    },
    subheaderDiv: {
      maxWidth: "800px",
      marginBottom: "15px",
    },
    subHeader: {
      margin: theme.spacing(1, 0),
      marginBottom: theme.spacing(2),
      fontSize: "13px",
      lineHeight: "1.38",
      fontFamily: "Joan",
      [theme.breakpoints.up("sm")]: {
        fontSize: "1.3rem",
      },
      [theme.breakpoints.up("md")]: {
        marginBottom: theme.spacing(3),
      },
    },
    tabsContainer: {
      marginBottom: "20px",
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
      // marginTop: '45px',
    },
    text: {
      minWidth: 0,
    },
    headline: {
      fontFamily: "Roboto",
      textDecoration: "underline",
      marginBottom: theme.spacing(1),
    },
    coverImage: {
      width: "100%",
      borderRadius: "5px 5px 0 0",
      [theme.breakpoints.up("lg")]: {
        flexDirection: "row",
        borderRadius: "5px 0 0 5px",
      },
    },
    dateSpan: {
      textAlign: "right",
      marginTop: "8px",
      color: "#999999",
    },
    line: {
      marginTop: theme.spacing(1),
      height: "4px",
      backgroundColor: "var(--primary-color)",
    },
    textContent: {
      padding: "20px",
      display: "inline-block",

      width: "100%",
      blockSize: "fit-content",
    },
    articleLeadDiv: {
      "& :hover": {
        backgroundColor: "#D6A407",
      },

      display: "flex",
      justifyContent: "center",
    },
    articleLeadButton: {
      marginTop: "4px",
      width: "300px",
      backgroundColor: "#E0AC08",
      color: "#fff",
      // height: '70px'
      marginBottom: "15px",
    },
    headerButton: {
      fontFamily: "Gotham",
      fontWeight: 500,
    },
    menuFlex: {
      [theme.breakpoints.up("smPlus")]: {
        display: "flex",
        flexDirection: "row",
        ...rowGap(5),
        flexWrap: "wrap",
        marginBottom: "20px",
      },
    },
    link: {
      "&:hover": {
        textDecoration: "none",
      },
      color: "#000",
    },

    [theme.breakpoints.up("lg")]: {
      artistTab: {
        marginTop: "45px",
        "& .MuiTabScrollButton-root": {
          display: "none",
        },
      },
      tabsContainer: {
        marginBottom: "40px",
      },
    },

    [theme.breakpoints.up("lgPlus")]: {
      flexHeaderButton: {
        flexDirection: "row",
      },
      artistTab: {
        marginLeft: "0",
        marginTop: "0",
        "& .MuiTabScrollButton-root": {
          display: "none",
        },
      },
    },
  })
);
