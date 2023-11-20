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
      [theme.breakpoints.up("md")]: {
        "& .MuiTab-root": {
          minWidth: "172px",
        },
      },
      justifyContent: "center",
      width: "100%",
    },
    tab: {
      fontSize:'8px',
      [theme.breakpoints.up("sm")] : {
        fontSize: '14px',
      },
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
      width: "38px",
      minWidth: "36px",
      color: "white",
      backgroundColor: "var(--yellow-darker)",
      "& .MuiButton-startIcon": {
        margin: "0 0",
      },
    },

    stories: {
      
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
  })
);
