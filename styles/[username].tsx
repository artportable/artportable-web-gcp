import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { rowGap, columnGap } from "../app/utils/styleUtils";

export const profileStyles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      gridArea: "articles",
      cursor: "pointer",
      marginBottom: "15px",
    },
    wrapper: {
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("lg")]: {
        flexDirection: "row",
      },
    },
    profileTopMargin: {
      marginTop: "0px",
      [theme.breakpoints.up("smPlus")]: {
        marginTop: "60px",
      },
    },
    headline: {
      textDecoration: "underline",
      marginBottom: theme.spacing(1),
    },
    coverImage: {
      width: "100%",
      borderRadius: "5px 5px 0 0",
      [theme.breakpoints.up("lg")]: {
        flexDirection: "row",
        borderRadius: "5px 0 0 5px",
        width: "unset",
        height: "100%",
      },
    },
    upgradeButton: {
      borderRadius: "30px",
      fontWeight: 500,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "white",
      border: "1px solid black",
      color: "black",
      width: "150px",
      height: "40px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      marginTop: "30px",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "14px",
      },
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
      color: "var(--text-color)",
    },
    tabsContainer: {
      gridArea: "tabs",
    },
    tabs: {
      "& .MuiTab-root": {
        minWidth: "60px",
      },
      "& .MuiTabs-scrollable": {
        flexGrow: 0, // Center tabs on screen.
      },
      [theme.breakpoints.up("md")]: {
        "& .MuiTab-root": {
          minWidth: "172px",
        },
      },
      justifyContent: "center",
      width: "100%",
      paddingBottom: 20,
    },
    tab: {
      minHeight: 0,
      padding: 0,
      margin: "0 12px",
      // fontSize: "8px",
      fontSize: "12px",
      textTransform: "none", // Prevent Tab from automatically being capitalized.
      minWidth: "auto !important",
      [theme.breakpoints.up("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.up("md")]: {
        margin: "0 24px",
      },
    },
    tabLight: {
      color: "white",
    },
    catalogued: {
      gridRow: "3/4",
      gridColumn: "4/5",
      display: "flex",
      justifyContent: "center",
      margin: "50px 0 0 0",
    },
    emblem: {
      width: "60px",
      height: "60px",
      color: "#FFD700",
      marginLeft: "20px",
      marginTop: "50px",
    },
    portfolioContainer: {
      display: "flex",
      flexDirection: "column",
      ...columnGap(16),
    },
    portfolioContainerSorted: {
      flexFlow: "row wrap",
    },
    portfolioRow: {
      display: "flex",
      ...rowGap(16),
      justifyContent: "flex-start",
      overflow: "hidden",
    },
    secondDivider: {
      gridArea: "divider2",
    },
    similarPortfolios: {
      gridArea: "portfolio",
      marginBottom: "100px",
    },
    editButton: {
      backgroundColor: "transparent",
      color: "black",
      fontSize: "9px",
    },

    boostButton: {
      minWidth: "36px",
      backgroundColor: "#fadf87",
      borderRadius: "20px",
      color: "black",
      fontSize: "10px",
    },

    [theme.breakpoints.up("sm")]: {
      emblem: {
        width: "80px",
        height: "80px",
        marginLeft: "45px",
        marginTop: "50px",
      },
      followButton: {
        marginTop: "8px",
        maxHeight: "27px",
        "& .MuiButton-startIcon": {
          margin: "0 8px 0 -4px",
        },
      },
    },
    [theme.breakpoints.up("smPlus")]: {
      emblem: {
        width: "80px",
      },
    },
    [theme.breakpoints.up("md")]: {
      catalogued: {
        position: "relative",
        left: "120px",
        justifySelf: "flex-end",
        gridRow: "3/4",
        gridColumn: "5/6",
        marginTop: "10px",
      },
      emblem: {
        marginLeft: "0",
        marginRight: "30px",
        marginTop: "0",
      },
    },
    [theme.breakpoints.up("mdPlus")]: {
      emblem: {},
    },
    masonryContainer: {
      padding: 10,
    },
  })
);
