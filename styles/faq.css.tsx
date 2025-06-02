import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    // Main Container
    scandinavianContainer: {
      width: "100%",
      backgroundColor: "#fafafa",
      fontFamily: "Roboto",
    },

    // Content Container
    contentContainer: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "0 20px",
      [theme.breakpoints.up("md")]: {
        padding: "0 40px",
      },
    },

    // Hero Section
    heroSection: {
      backgroundColor: "#ffffff",
      minHeight: "20vh",
      display: "flex",
      alignItems: "center",
      position: "relative",
      [theme.breakpoints.up("md")]: {
        marginTop: "50px",
        minHeight: "40vh",
      },
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "60px",
        height: "1px",
        backgroundColor: "#e1e1e1",
      },
    },
    heroContent: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "0 20px",
      width: "100%",
      [theme.breakpoints.up("md")]: {
        padding: "0 40px",
      },
    },
    heroTextBlock: {
      maxWidth: "600px",
    },
    heroTitle: {
      fontSize: "clamp(1.8rem, 6vw, 3.5rem)",
      fontWeight: 300,
      lineHeight: 1.1,
      color: "#1a1a1a",
      marginBottom: "16px",
      letterSpacing: "-0.02em",
      [theme.breakpoints.up("md")]: {
        marginBottom: "24px",
      },
    },
    accentLine: {
      width: "60px",
      height: "2px",
      backgroundColor: "#4a4a4a",
      marginBottom: "20px",
      [theme.breakpoints.up("md")]: {
        width: "80px",
        marginBottom: "32px",
      },
    },
    heroSubtitle: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#6b6b6b",
      fontWeight: 400,
      maxWidth: "480px",
      fontFamily: "Joan",
      [theme.breakpoints.up("md")]: {
        fontSize: "1.25rem",
      },
    },

    // Section Styles
    faqSection: {
      padding: "60px 0",
      borderBottom: "1px solid #f0f0f0",
      "&:last-child": {
        borderBottom: "none",
      },
      [theme.breakpoints.up("md")]: {
        padding: "80px 0",
      },
    },

    // Section Label
    sectionLabel: {
      fontSize: "0.875rem",
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "#8a8a8a",
      marginBottom: "32px",
      [theme.breakpoints.up("md")]: {
        marginBottom: "48px",
      },
    },

    // Questions Container
    questionsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },

    questionWrapper: {
      borderBottom: "1px solid #f0f0f0",
      "&:last-child": {
        borderBottom: "none",
      },
    },

    // Accordion Styles
    questionAccordion: {
      backgroundColor: "transparent !important",
      boxShadow: "none !important",
      "&:before": {
        display: "none",
      },
      "&.Mui-expanded": {
        margin: "0 !important",
      },
    },

    questionSummary: {
      padding: "20px 0",
      minHeight: "auto !important",
      "&.Mui-expanded": {
        minHeight: "auto !important",
      },
      "& .MuiAccordionSummary-content": {
        margin: "0 !important",
        "&.Mui-expanded": {
          margin: "0 !important",
        },
      },
      [theme.breakpoints.up("md")]: {
        padding: "24px 0",
      },
    },

    questionTitle: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#1a1a1a",
      lineHeight: 1.4,
      [theme.breakpoints.up("md")]: {
        fontSize: "1.125rem",
      },
    },

    expandIcon: {
      color: "#8a8a8a",
      fontSize: "1.5rem",
    },

    answerDetails: {
      padding: "0 0 24px 0",
    },

    answerText: {
      fontSize: "0.9rem",
      lineHeight: 1.7,
      color: "#6b6b6b",
      fontFamily: "Joan",
      [theme.breakpoints.up("md")]: {
        fontSize: "1rem",
      },
    },

    // Contact Section
    contactSection: {
      backgroundColor: "#1a1a1a",
      padding: "60px 0",
      [theme.breakpoints.up("md")]: {
        padding: "80px 0",
      },
    },

    contactContent: {
      textAlign: "center",
      maxWidth: "500px",
      margin: "0 auto",
    },

    contactTitle: {
      fontSize: "1.5rem",
      fontWeight: 400,
      color: "#ffffff",
      marginBottom: "16px",
      [theme.breakpoints.up("md")]: {
        fontSize: "2rem",
        marginBottom: "24px",
      },
    },

    contactText: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#c0c0c0",
      marginBottom: "32px",
      fontFamily: "Joan",
      [theme.breakpoints.up("md")]: {
        fontSize: "1.125rem",
        marginBottom: "40px",
      },
    },

    contactActions: {
      display: "flex",
      justifyContent: "center",
    },

    contactButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 24px",
      backgroundColor: "#ffffff",
      color: "#1a1a1a",
      textDecoration: "none",
      borderRadius: "20px",
      fontSize: "0.9rem",
      height: "40px",
      fontWeight: 500,
      transition: "all 0.2s ease",
      border: "1px solid transparent",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#ffffff",
        borderColor: "#ffffff",
      },
      [theme.breakpoints.up("md")]: {
        padding: "14px 28px",
        fontSize: "1rem",
      },
    },

    contactIcon: {
      fontSize: "1.2rem",
    },

    // Legacy styles kept for backward compatibility
    container: {
      display: "flex",
      flexDirection: "column",
    },
    headerContainer: {
      fontFamily: "Roboto",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "black",
      color: " white",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "28px",
      padding: "10px",
      height: "40vh",
      textAlign: "center",
      [theme.breakpoints.up("md")]: {
        fontSize: "35px",
      },
    },
    faqContainer: {
      display: "flex",
      flexDirection: "column-reverse",
      justifyContent: "center",
      alignItems: "flex-start",
      fontFamily: "Roboto",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
      },
    },
    faqAnswers: {
      width: "100vw",
      marginBottom: "10px",
      [theme.breakpoints.up("md")]: {
        width: "60vw",
      },
    },
    boxNav: {
      display: "flex",
      flexDirection: "column",
      padding: "10px",
      borderRadius: "2px",
      marginLeft: "10px",
      [theme.breakpoints.up("md")]: {
        position: "sticky",
        marginTop: "40px",
        top: "80px",
      },
    },
    titlesWrapper: {
      marginTop: "20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "10px",
      paddingLeft: "20px",
      paddingRight: "20px",
      fontFamily: "Roboto",
      [theme.breakpoints.up("md")]: {
        fontSize: "16px",
      },
    },
    h1: {
      fontSize: "16px",
      [theme.breakpoints.up("md")]: {
        fontSize: "35px",
      },
    },
    articles: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    subTitle: {
      fontSize: "14px",
      margin: "0px",
      fontFamily: "Roboto",
      [theme.breakpoints.up("md")]: {
        fontSize: "28px",
      },
    },
    paragraph: { 
      fontFamily: "Joan",
    },
    numbers: {
      fontSize: "22px",
      backgroundColor: "#fadf87",
      color: "white",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);
