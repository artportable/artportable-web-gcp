import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { columnGap, rowGap } from "../../utils/styleUtils";

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
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 40px",
      [theme.breakpoints.down("sm")]: {
        padding: "0 24px",
      },
    },

    // Hero Section
    heroSection: {
      backgroundColor: "#ffffff",
      minHeight: "40vh",
      display: "flex",
      alignItems: "center",
      position: "relative",
      [theme.breakpoints.up("smPlus")]: {
        minHeight: "60vh",
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
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 40px",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        padding: "0 24px",
      },
    },
    heroTextBlock: {
      maxWidth: "600px",
    },
    heroTitle: {
      fontSize: "clamp(1.5rem, 8vw, 3.5rem)",
      fontWeight: 300,
      lineHeight: 1.1,
      color: "#1a1a1a",
      marginBottom: "24px",
      letterSpacing: "-0.02em",
    },
    accentLine: {
      width: "80px",
      height: "2px",
      backgroundColor: "#4a4a4a",
      marginBottom: "32px",
    },
    heroSubtitle: {
      fontSize: "1.25rem",
      lineHeight: 1.6,
      color: "#6b6b6b",
      fontWeight: 400,
      maxWidth: "480px",
      fontFamily: "Joan",
    },

    // Section Styles
    missionSection: {
      backgroundColor: "#ffffff",
      padding: "0px 0px 50px 0px",
      [theme.breakpoints.down("md")]: {
        
      },
    },
    servicesSection: {
      backgroundColor: "#f8f8f8",
      padding: "120px 0",
      [theme.breakpoints.down("md")]: {
        padding: "80px 0",
      },
    },
    valuesSection: {
      backgroundColor: "#ffffff",
      padding: "120px 0",
      [theme.breakpoints.down("md")]: {
        padding: "80px 0",
      },
    },
    teamSection: {
      backgroundColor: "#f8f8f8",
      padding: "120px 0",
      [theme.breakpoints.down("md")]: {
        padding: "80px 0",
      },
    },
    contactSection: {
      backgroundColor: "#1a1a1a",
      padding: "120px 0",
      [theme.breakpoints.down("md")]: {
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
      marginBottom: "48px",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "32px",
      },
    },

    // Mission Section
    missionGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 300px",
      gap: "80px",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
        gap: "48px",
      },
    },
    missionTextContainer: {
      maxWidth: "600px",
    },
    missionText: {
      fontSize: "1.125rem",
      lineHeight: 1.7,
      color: "#6b6b6b",
      marginBottom: "24px",
      fontFamily: "Joan",
      fontWeight: 400,
      "&:last-child": {
        marginBottom: 0,
      },
    },
    missionVisual: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    geometricShape: {
      width: "400px",
      height: "200px",
      backgroundColor: "#f0f0f0",
      borderRadius: "4px",
      position: "relative",
      "&::after": {
        content: '""',
        position: "absolute",
        top: "20px",
        left: "20px",
        width: "260px",
        height: "160px",
        border: "1px solid #e1e1e1",
        borderRadius: "2px",
      },
    },

    // Services Section
    servicesGrid: {
      display: "grid",
      gap: "48px",
      [theme.breakpoints.up("md")]: {
        gap: "64px",
      },
    },
    serviceItem: {
      display: "grid",
      gridTemplateColumns: "80px 1fr",
      gap: "32px",
      alignItems: "start",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "60px 1fr",
        gap: "24px",
      },
    },
    serviceNumber: {
      fontSize: "2rem",
      fontWeight: 300,
      color: "#b0b0b0",
      lineHeight: 1,
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.5rem",
      },
    },
    serviceContent: {
      paddingTop: "4px",
    },
    serviceTitle: {
      fontSize: "1.5rem",
      fontWeight: 400,
      color: "#1a1a1a",
      marginBottom: "16px",
      lineHeight: 1.3,
      fontFamily: "Roboto",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.25rem",
      },
    },
    serviceDescription: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#6b6b6b",
      maxWidth: "480px",
      fontFamily: "Joan",
    },

    // Values Section
    valuesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "48px",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
        gap: "40px",
      },
    },
    valueCard: {
      padding: "32px 0",
      borderTop: "1px solid #e1e1e1",
    },
    valueTitle: {
      fontSize: "1.25rem",
      fontWeight: 400,
      color: "#1a1a1a",
      marginBottom: "16px",
      lineHeight: 1.3,
    },
    valueDescription: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#6b6b6b",
      fontFamily: "Joan",
    },

    // Team Section
    teamGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "48px",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
        gap: "32px",
      },
    },
    teamMember: {
      padding: "24px 0",
    },
    teamInfo: {
      borderBottom: "1px solid #e1e1e1",
      paddingBottom: "24px",
    },
    teamName: {
      fontSize: "1.25rem",
      fontWeight: 400,
      color: "#1a1a1a",
      marginBottom: "8px",
      lineHeight: 1.3,
      fontFamily: "Roboto",
    },
    teamRole: {
      fontSize: "0.875rem",
      color: "#8a8a8a",
      marginBottom: "12px",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    teamEmail: {
      fontSize: "0.9rem",
      color: "#6b6b6b",
      textDecoration: "none",
      borderBottom: "1px solid transparent",
      transition: "border-color 0.2s ease",
      "&:hover": {
        borderBottomColor: "#6b6b6b",
      },
    },

    // Contact Section
    contactGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 400px",
      gap: "80px",
      alignItems: "start",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
        gap: "48px",
      },
    },
    contactInfo: {
      "& $sectionLabel": {
        color: "#a0a0a0",
      },
    },
    contactText: {
      fontSize: "1.125rem",
      lineHeight: 1.7,
      color: "#c0c0c0",
      maxWidth: "480px",
    },
    contactDetails: {
      display: "flex",
      flexDirection: "column",
      gap: "32px",
    },
    contactItem: {
      borderBottom: "1px solid #333333",
      paddingBottom: "24px",
    },
    contactLabel: {
      fontSize: "0.875rem",
      color: "#a0a0a0",
      marginBottom: "8px",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    contactLink: {
      fontSize: "1.125rem",
      color: "#ffffff",
      textDecoration: "none",
      borderBottom: "1px solid transparent",
      transition: "border-color 0.2s ease",
      "&:hover": {
        borderBottomColor: "#ffffff",
      },
    },
    contactValue: {
      fontSize: "1rem",
      color: "#e0e0e0",
      lineHeight: 1.5,
    },

    // Legacy styles for compatibility (with unique names)
    pageWrapper: {
      width: "100vw",
      backgroundColor: "transparent",
      margin: "0 auto",
      padding: "50px 0",
    },
    simpleHeader: {
      width: "100vw",
      minHeight: "300px",
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e0e0e0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 20px",
    },
    headerContent: {
      textAlign: "center",
      maxWidth: "800px",
    },
    simpleTitle: {
      fontSize: "3rem",
      fontWeight: 400,
      color: "#333333",
      fontFamily: "Joan",
      marginBottom: theme.spacing(2),
    },
    simpleSubtitle: {
      fontSize: "1.5rem",
      fontWeight: 300,
      color: "#666666",
      fontFamily: "Roboto",
    },
    simpleMissionFrame: {
      padding: "40px",
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      backgroundColor: "#ffffff",
    },
    sectionSpacing: {
      width: "100vw",
      marginBottom: theme.spacing(8),
    },
    sectionHeader: {
      textAlign: "center",
      marginBottom: theme.spacing(6),
    },
    sectionHeading: {
      fontSize: "2rem",
      fontWeight: 400,
      textAlign: "center",
      color: "#333333",
      fontFamily: "Roboto",
    },
    containerCard: {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr",
      justifyItems: "center",
      gap: "30px",
      padding: "0 20px",
    },
    simpleServiceCard: {
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      maxWidth: "350px",
      height: "280px",
      background: "#ffffff",
    },
    simpleIconContainer: {
      padding: "15px",
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(3),
    },
    serviceIcon: {
      width: "40px",
      height: "40px",
      opacity: 0.8,
    },
    simpleValueCard: {
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      maxWidth: "350px",
      height: "220px",
      background: "#ffffff",
    },
    valueIcon: {
      width: "40px",
      height: "40px",
      marginBottom: theme.spacing(2),
      opacity: 0.8,
    },
    simpleContactSection: {
      marginBottom: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    simpleTeamCard: {
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      maxWidth: "350px",
      height: "200px",
      background: "#ffffff",
    },
    simpleAvatar: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      border: "2px solid #e0e0e0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#666666",
      fontWeight: 500,
      fontSize: "1rem",
      marginBottom: theme.spacing(2),
      backgroundColor: "#f5f5f5",
    },
    teamMemberName: {
      fontSize: "1.2rem",
      fontWeight: 500,
      marginBottom: theme.spacing(0.5),
      color: "#333333",
      fontFamily: "Roboto",
      textAlign: "center",
    },
    teamMemberTitle: {
      fontSize: "14px",
      color: "#666666",
      marginBottom: theme.spacing(1.5),
      textAlign: "center",
      fontWeight: 400,
    },
    emailLink: {
      textDecoration: "none",
      fontWeight: 400,
      fontSize: "14px",
      color: "#666666",
      "&:hover": {
        textDecoration: "underline",
        color: "#333333",
      },
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flexGrow: 1,
      width: "100%",
      padding: "20px",
      textAlign: "center",
    },
    contactContainer: {
      textAlign: "center",
      padding: theme.spacing(4),
      maxWidth: "600px",
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      backgroundColor: "#ffffff",
      margin: "0 20px",
    },
    contactContent: {
      maxWidth: "600px",
    },
  })
);

