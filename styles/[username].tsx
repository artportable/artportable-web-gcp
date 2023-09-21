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
    imageDiv: {
      width: "100%",
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

    profileGrid: {
      display: "grid",
      gap: "16px",
      gridTemplate:
        '"      .              .         .        .              ."       185px' +
        '"      .              .      profile     .              ."       50px' +
        '"      .              .      profile     .              actions"       auto' +
        '"      .           friends   friends   friends           ."       auto' +
        '"      .              hej      hej       hej               ."       auto' +
        '"   divider        divider   divider   divider       divider"       auto' +
        '"      .         priceSpan  priceSpan  priceSpan        ."       auto' +
        '"     articles    articles   articles articles      articles"       auto' +
        '"     tabs           tabs      tabs     tabs           tabs"       1fr' +
        '"   divider2       divider2  divider2  divider2      divider2"       auto' +
        '"   portfolio      portfolio portfolio portfolio    portfolio"       auto' +
        "/ minmax(0, 2fr) minmax(0, 2fr) minmax(200px, 2fr) minmax(0, 2fr) minmax(0, 2fr)",
    },
    profileSummary: {
      gridArea: "profile",
    },
    editActions: {
      paddingTop: theme.spacing(0.5),
      gridArea: "actions",
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(1),
      justifySelf: "flex-end",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        justifyContent: "flex-end",  
        margin: "0",  
        marginTop: "-42px"
 
      },
    },

    chatFollowWrapper: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        justifyContent: "flex-end",  
        margin: "0",  
        width: "20%"
      },
    },
    
    fullName: {
      display: "flex",
      justifyContent: "center", 
      fontWeight: 600,
      fontSize: "22px",
      letterSpacing: "6px",
      margin: "auto",
      [theme.breakpoints.up("smPlus")]: {
        justifyContent: "space-around",

      },
      [theme.breakpoints.up("md")]: {
        justifyContent: "flex-start",
        marginBottom: "-45px",
        fontSize: "20px",
       
  
      },
    },
    followButton: {
      maxHeight: "27px",
      width: "40%",
      margin: "0 auto",
      marginBottom: "10px",
      backgroundColor: "transparent",
      border: "1px solid #fadf87",
      color: "black",
      [theme.breakpoints.up("md")]: {
        width: "40%",


      },
      "&:hover": {
        backgroundColor: "#fadf87",
        color: "white",
      },
    },
    following: {
      maxHeight: "27px",
      width: "40%",
      margin: "0 auto",
      marginBottom: "10px",
      backgroundColor: "#fadf87",
      border: "1px solid #fadf87",
      color: "white",
      [theme.breakpoints.up("md")]: {
        width: "40%",


      },
      "&:hover": {
        backgroundColor: "transparent",
        color: "black",
      },
    },
    chatButton: {
      maxHeight: "27px",
      width: "40%",
      margin: "0 auto",
      marginBottom: "20px",
      backgroundColor: "transparent",
      border: "1px solid black",
      color: "black",
      [theme.breakpoints.up("md")]: {
        width: "40%",
      },
      "&:hover": {
        backgroundColor: "black",
        color: "white",
      },
    },
    
    friends: {
      gridArea: "friends",
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
      [theme.breakpoints.up("smPlus")]: {
        display: "none",
      },
      
    },
    hovs: {
      "& :hover": {
        backgroundColor: "#D6A407",
      },
      gridArea: "hej",
      display: "flex",
      justifyContent: "center",
    },
    upgradeGoldDiv: {
      gridArea: "hej",
      display: "flex",
      justifyContent: "center",
    },
    monthlyArtistButton: {
      marginTop: "4px",
      width: "300px",
      backgroundColor: "#E0AC08",
      color: "#fff",
    },
    headerButton: {
      fontFamily: "Gotham",
      fontWeight: 500,
    },
    pButton: {
      fontFamily: "Gotham",
    },
    messageButtonText: {
      display: "none",
    },
    tabsContainer: {
      gridArea: "tabs",
    },
    tabs: {
      "& .MuiTab-root": {
        minWidth: "0px",
      },
      [theme.breakpoints.up("md")]: {
        "& .MuiTab-root": {
          minWidth: "172px",
        },
      },
      justifyContent: "center",
      width: "100%",
    },
    text: {
      minWidth: 0,
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
    divider: {
      gridArea: "divider",
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
    uploadButton: {
      width: "13px",
      display: "none",
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
      "& .MuiButton-startIcon": {
        margin: "0 0",
      },
    },
    headerButtonRocket: {
      fontFamily: "Gotham",
      fontWeight: 500,
      paddingLeft: "20px",
    },

    rocketIcon: {
      padding: "10px",
      maxWidth: "40px",
      width: "100%",
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
      uploadButton: {
        display: "flex",
      },
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
      messageButtonText: {
        display: "initial",
      },
    },
    [theme.breakpoints.up("mdPlus")]: {
      emblem: {},
    },
  })
);
