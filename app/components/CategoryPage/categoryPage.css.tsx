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
      marginTop: '60px',

    },
    wrapper: {
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        height: '240px'
  
      },
    },
    headerDiv: {
      marginBottom: "15px",
    },
    header: {
      fontFamily: "Roboto",
      fontWeight: 300,
      fontSize: "44px",

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
        fontSize: "16px",
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
        height: '200px'
        
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
    

    responsiveContainer: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'space-between',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    
    leftColumn: {
      width: '855px',
      flexShrink: 0,
      margin: "20px",
      [theme.breakpoints.down('md')]: {
        width: '100vw',
    
      },
    },
    
    rightColumn: {
      width: '580px',
      flexShrink: 0,
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    
    // Article card styles
    articleCard: {
      display: 'flex',
      backgroundColor: '#ffffff52',
      padding: '6px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
      gap: '20px',
      alignItems: 'center',
      marginBottom: '30px',
      '&:hover': {
        textDecoration: 'none',
      },
      [theme.breakpoints.up('md')]: {
      
        height: "245px",
        padding: "20px",
      },
    },
    
    articleImage: {
      width: '100px',
      height: '100px',
      flexShrink: 0,
      overflow: 'hidden',
      borderRadius: '4px',
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
      [theme.breakpoints.up("smPlus")]: {
        width: '200px',
        height: '200px',
      },

    },
    
    articleContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    
    articleCategory: {
      color: '#1976d2',
      fontSize: '11px',
      fontWeight: 400,
      textTransform: 'uppercase',
      fontFamily: 'Roboto',
      [theme.breakpoints.up("smPlus")]: {
        fontSize: '14px',
      },
    },
    
    articleDate: {
      color: '#666',
      fontSize: '9px',
      marginBottom: '12px',
      [theme.breakpoints.up("smPlus")]: {
        fontSize: '14px',
      },
    },
    
    articleTitle: {
      fontSize: '11px',
      fontWeight: 'bold',
      color: '#333',
      lineHeight: '1.3',
     
      fontFamily: 'Roboto',
      [theme.breakpoints.up("smPlus")]: {
        fontSize: '22px',
      },
    },
    
    articleDescription: {
      color: '#666',
      fontSize: '11px',
      lineHeight: '1.5',
      fontFamily: 'Joan',
      [theme.breakpoints.up("smPlus")]: {
        fontSize: '16px',
      },
    },
    
    readMore: {
      display: 'flex',
      justifyContent: 'flex-end',
      '& span': {
        color: 'gray',
        fontSize: '14px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      },
    },

    // Main container styles
    mainContainer: {
      padding: '40px',
    },

    // Section headers
    sectionHeader: {
      fontFamily: "Roboto !important",
      marginBottom: '30px',
      marginTop: '20px',
      fontWeight: 'bold',
      color: '#333',
      fontSize: '28px',
    },

    // Loading state
    loadingContainer: {
      textAlign: 'center',
      padding: '40px',
    },

    noArticlesContainer: {
      textAlign: 'center',
      padding: '40px',
      color: '#666',
    },

    // Right column article cards
    rightColumnCard: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
      marginBottom: '20px',
      '&:hover': {
        textDecoration: 'none',
      },
    },

    rightColumnImage: {
      width: '100%',
      height: '150px',
      overflow: 'hidden',
      marginBottom: '12px',
      borderRadius: '4px',
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },

    rightColumnCategory: {
      color: '#1976d2',
      fontSize: '12px',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontFamily: 'Roboto',
    },

    rightColumnDate: {
      color: '#666',
      fontSize: '12px',
      marginBottom: '8px',
    },

    rightColumnTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      lineHeight: '1.3',
      marginBottom: '8px',
      fontFamily: 'Roboto',
    },

    rightColumnDescription: {
      color: '#666',
      fontSize: '14px',
      lineHeight: '1.4',
      marginBottom: '12px',
      fontFamily: 'Joan',
    },

    rightColumnReadMore: {
      display: 'flex',
      justifyContent: 'flex-end',
      '& span': {
        color: 'gray',
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      },
    },

    // Stories section
    storiesContainer: {
      padding: '40px',
    },

    storiesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
    },

    storyCard: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'none',
      },
    },

    storyImage: {
      width: '100%',
      height: '120px',
      overflow: 'hidden',
      marginBottom: '12px',
      borderRadius: '4px',
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },

    storyAuthor: {
      color: '#1976d2',
      fontSize: '12px',
      fontWeight: 500,
      marginBottom: '6px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontFamily: 'Roboto',
    },

    storyTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
      lineHeight: '1.3',
      marginBottom: '8px',
      fontFamily: 'Roboto',
    },

    storyReadMore: {
      display: 'flex',
      justifyContent: 'flex-end',
      '& span': {
        color: 'gray',
        fontSize: '11px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      },
    },

    // Artist portraits section
    portraitsContainer: {
      padding: '50px',
    },

    portraitCard: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
      gap: '20px',
      marginBottom: '30px',
      '&:hover': {
        textDecoration: 'none',
      },
    },

    portraitImage: {
      width: '200px',
      height: '180px',
      flexShrink: 0,
      overflow: 'hidden',
      borderRadius: '4px',
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },

    portraitContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    portraitCategory: {
      color: '#1976d2',
      fontSize: '12px',
      fontWeight: 500,
      marginBottom: '6px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontFamily: 'Roboto',
    },

    portraitDate: {
      color: '#666',
      fontSize: '12px',
      marginBottom: '8px',
    },

    portraitTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#333',
      lineHeight: '1.3',
      marginBottom: '8px',
      fontFamily: 'Roboto',
    },

    portraitDescription: {
      color: '#666',
      fontSize: '14px',
      lineHeight: '1.4',
      marginBottom: '12px',
      fontFamily: 'Joan',
    },

    portraitReadMore: {
      display: 'flex',
      justifyContent: 'flex-end',
      '& span': {
        color: 'gray',
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      },
    },
  })
);
