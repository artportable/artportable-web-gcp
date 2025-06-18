import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { rowGap, columnGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    flexHeaderButton: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
     
      [theme.breakpoints.up('md')]: {
     
        marginTop: '30px',
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
      margin: "10px",
      [theme.breakpoints.down('md')]: {
        width: '100vw',
      },
    },
    
    rightColumn: {
      width: '580px',
      flexShrink: 0,
      display: 'block',
      [theme.breakpoints.down('md')]: {
        width: '100vw',
        marginTop: '20px',
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
        fontSize: '11px',
        fontWeight: 400,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      },
    },

    // Main container styles
    mainContainer: {
      padding: '0px',
      [theme.breakpoints.up("md")]: {
        padding: '40px',
      },
    },

    // Section headers
    sectionHeader: {
      fontFamily: "Roboto !important",
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px',
      marginTop: '0px',
      fontWeight: 'bold',
      color: '#333',
      fontSize: '28px',
      [theme.breakpoints.up("md")]: {
        justifyContent: 'flex-start',
      },
    },

    // Loading state
    loadingContainer: {
      textAlign: 'center',
      padding: '40px',
    },

    noArticlesContainer: {
      textAlign: 'center',
      padding: '20px',
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
      padding: '0px',
      [theme.breakpoints.up('md')]: {
        padding: '50px',
      },
    },

    storiesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
      },
    },

    storiesButtonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
      marginBottom: '30px',
      padding: '0 20px',
    },

    storiesButton: {
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

    storyCard: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      padding: '16px',
      height: "300px",
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
        fontWeight: 400,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      },
    },

    // Articles container (replaces left/right column layout)
    articlesContainer: {
      width: '100%',
      maxWidth: '100%',
  
      padding: '10px',
      [theme.breakpoints.up('md')]: {
        padding: '0px',
      },
    },

    // Pagination styles
    paginationContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px',
      marginBottom: '40px',
      gap: '20px',
    },

    paginationInfo: {
      textAlign: 'center',
    },

    paginationText: {
      color: '#666',
      fontSize: '14px',
      fontFamily: 'Roboto',
    },

    paginationControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },

    paginationButton: {
      padding: '8px 16px',
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontFamily: 'Roboto',
      transition: 'all 0.2s ease',
      '&:hover:not(.disabled)': {
        backgroundColor: '#f5f5f5',
        borderColor: '#999',
      },
      '&.disabled': {
        opacity: 0,
        cursor: 'not-allowed',
      },
    },

    pageNumbers: {
      display: 'flex',
      gap: '5px',
    },

    pageNumber: {
      padding: '8px 12px',
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontFamily: 'Roboto',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#f5f5f5',
        borderColor: '#999',
      },
      '&.active': {
        backgroundColor: '#1976d2',
        borderColor: '#1976d2',
        color: '#fff',
      },
    },

    disabled: {
      display: 'none',
      opacity: 0,
      cursor: 'not-allowed',
    },

    active: {
      backgroundColor: '#1976d2',
      borderColor: '#1976d2',
      color: '#fff',
    },

    // Artist portraits section
    portraitsContainer: {
      padding: '0px',
      [theme.breakpoints.up('md')]: {
        padding: '50px',
      },
    },

    portraitCard: {
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

    portraitImage: {
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

    portraitContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    portraitCategory: {
      color: '#1976d2',
      fontSize: '11px',
      fontWeight: 400,
      textTransform: 'uppercase',
      fontFamily: 'Roboto',
      [theme.breakpoints.up("smPlus")]: {
        fontSize: '14px',
      },
    },

    portraitDate: {
      color: '#666',
      fontSize: '9px',
      marginBottom: '12px',
      [theme.breakpoints.up("smPlus")]: {
        fontSize: '14px',
      },
    },

    portraitTitle: {
      fontSize: '11px',
      fontWeight: 'bold',
      color: '#333',
      lineHeight: '1.3',
      fontFamily: 'Roboto',
      [theme.breakpoints.up("smPlus")]: {
        fontSize: '22px',
      },
    },

    portraitDescription: {
      color: '#666',
      fontSize: '11px',
      lineHeight: '1.5',
      fontFamily: 'Joan',
      [theme.breakpoints.up("smPlus")]: {
        fontSize: '16px',
      },
    },

    portraitReadMore: {
      display: 'flex',
      justifyContent: 'flex-end',
      '& span': {
        color: 'gray',
        fontSize: '11px',
        fontWeight: 400,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      },
    },
  })
);
