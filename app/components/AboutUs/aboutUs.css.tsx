import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { columnGap, rowGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    // Main layout - like exhibitions page
    pageWrapper: {
      width: "100vw",
      backgroundColor: "transparent",
      margin: "0 auto",

      padding: "50px 0",
      [theme.breakpoints.down("sm")]: {
        width: "100vw",
        padding: "50px 0",
      },
    },
    

    missionSection: {
      margin: "0 auto",
      marginBottom: theme.spacing(6),
      padding: "0 50px",
    },
    missionText: {
      fontSize: "1.1rem",
      lineHeight: 1.8,
      marginBottom: theme.spacing(2),
      fontFamily: "Joan",
      color: "#555",
      [theme.breakpoints.down("md")]: {
        maxWidth: "100%",
      },
    },
    
    // Section styles
    sectionSpacing: {
      width: "100vw",
    },
    sectionHeading: {
      fontSize: "1.8rem",
      fontWeight: 500,
      textAlign: "center",
      color: "black",
      fontFamily: "Roboto",
      [theme.breakpoints.up("md")]: {
        fontSize: "34px",

      },
    },
    
    // Card container - like exhibitions page
    containerCard: {
      width: "100%",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr",
      justifyItems: "center",
      marginBottom: theme.spacing(8),
      [theme.breakpoints.up("md")]: {
        gridTemplateColumns: "repeat(3, 1fr)",
      },
    },
    
    // Service cards
    serviceCard: {
      borderRadius: "2px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "330px",
      height: "300px",
      backgroundColor: "transparent",
      margin: "0 auto",
      transition: "all 0.3s ease",
  
    },
    serviceIcon: {
      width: "60px",
      height: "60px",
      marginTop: "30px",
      marginBottom: theme.spacing(2),
    },
    serviceTitle: {
      fontSize: "1.3rem",
      fontWeight: 600,
      textAlign: "center",
      fontFamily: "Roboto",
      color: "black",
    },
    serviceDescription: {
      fontSize: "14px",
      textAlign: "center",
      color: "black",
      padding: "0 20px",
    },
    
    // Value cards
    valueCard: {
      borderRadius: "2px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "330px",
      height: "200px",

      margin: "0 auto",
     

 
    },
    valueIcon: {
      width: "60px",
      height: "60px",
      marginTop: "30px",
      marginBottom: theme.spacing(2),
    },
    valueTitle: {
      fontSize: "1.2rem",
      fontWeight: 600,
      marginBottom: theme.spacing(1),
    
      color: "#333",
      fontFamily: "Roboto",
      textAlign: "center",
    },
    valueDescription: {
      fontSize: "14px",
      textAlign: "center",
      color: "#666",
      padding: "0 20px",
    },
    
  
    teamCard: {
      borderRadius: "2px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "330px",
      height: "180px",
     
      margin: "0 auto",
      marginTop: "10px",

  
    },
    teamMemberName: {
      fontSize: "1.2rem",
      fontWeight: 600,
      marginBottom: theme.spacing(0.5),
      color: "#333",
      fontFamily: "Roboto",
      textAlign: "center",
    },
    teamMemberTitle: {
      fontSize: "14px",
      color: "#666",
      marginBottom: theme.spacing(1.5),
      textAlign: "center",
      fontWeight: 500,
    },
    emailLink: {
  
      textDecoration: "none",
      fontWeight: 500,
      fontSize: "14px",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    
    // Card content
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
    
    // Contact section
    contactSection: {
      marginBottom: theme.spacing(6),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    contactContainer: {
     textAlign: "center",
      padding: theme.spacing(4),
      borderRadius: "2px",
      
    },
    contactContent: { 
      alignItems: "center",   
      justifyContent: "center",
      
    },
    contactText: {
      fontSize: "1.1rem",
      lineHeight: 1.6,
      marginBottom: theme.spacing(4),
      color: "#555",
    },
    contactInfo: {
      marginBottom: theme.spacing(3),
    },
    contactLabel: {
      color: "#333",
      fontWeight: 500,
      marginBottom: theme.spacing(1),
    },

    // Legacy styles to preserve compatibility
    rootContainer: {
      padding: theme.spacing(4, 2),
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(6, 4),
      },
    },
    container: {
      marginTop: "-60px",
      [theme.breakpoints.up("md")]: {
        marginTop: "0",
      },
    },
    heroSection: {
      textAlign: "center",
      padding: theme.spacing(6, 0),
      marginBottom: theme.spacing(6),
      backgroundColor: "#222222",
      color: "white",
      borderRadius: "4px",
    },
    mainHeading: {
      fontSize: "2.5rem",
      fontWeight: 600,
      marginBottom: theme.spacing(2),
      fontFamily: "Roboto",
      [theme.breakpoints.up("md")]: {
        fontSize: "3.5rem",
      },
    },
    subHeading: {
      fontSize: "1.2rem",
      fontWeight: 400,
      lineHeight: 1.6,
      maxWidth: "800px",
      margin: "0 auto",
      fontFamily: "Joan",
      [theme.breakpoints.up("md")]: {
        fontSize: "1.4rem",
      },
    },
    missionCard: {
      borderRadius: "4px",
      backgroundColor: "white",
      border: "1px solid #e0e0e0",
      padding: theme.spacing(4),
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    whatWeDoGrid: {
      justifyContent: "center",
    },
    iconContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: theme.spacing(2),
    },
    divider: {
      margin: theme.spacing(3, 0),
      backgroundColor: "#e0e0e0",
    },
    contactImageContainer: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8f9fa",
    },
    contactImage: {
      width: "100%",
      borderRadius: "4px",
    },
    contactCard: {
      borderRadius: "4px",
      backgroundColor: "white",
      border: "1px solid #e0e0e0",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    
    // Remove unused teamAvatar style
    teamAvatar: {
      display: "none",
    },

    // Preserved original styles
    zendeskForm: {
      marginTop: theme.spacing(4),
      width: "100%",
    },
    subHeaderTypoTwo: {
      fontSize: "30px",
      fontWeight: 600,
    },
    subHeaderTypoText: {
      fontSize: "18px",
      fontStyle:"italic"
    },
    paddingWidth: {
      [theme.breakpoints.up("lg")]: {
        padding: "0 100px 0 100px",
      },
    },
    flexPaper: {
      display: "flex",
      flexDirection: "column",
      ...columnGap(20),
      justifyContent: "center",
      [theme.breakpoints.up("mdPlus")]: {
        flexDirection: "row",
        ...rowGap(20),
      },
    },
    paperLeft: {
      width: "100%",  
      backgroundColor: "transparent",
      [theme.breakpoints.up("mdPlus")]: {
        width: "100%",
      },
    },
    paperRight: {
      padding: "30px 20px 20px 20px", 
      backgroundColor: "transparent",
      [theme.breakpoints.up("mdPlus")]: {
        height: "50%",
      },
    },
    headerTypo: {
      fontWeight: 600,
      fontSize: "35px",
    },
    textBlock: {
      margin: "30px 0 30px 0",
    },
    textBlockWidth: {
      [theme.breakpoints.up("mdPlus")]: {
        width: "70%",
      },
    },
    textBlockRight: {
      margin: "15px 0 15px 0",
    },
    typoBold: {
      fontWeight: 500,
    },
    icon: {
      marginRight: "10px",
      fontSize: "40px",
    },
    iconTextFlex: {
      display: "flex",
      alignItems: "center",
      ...columnGap(20),
    },
    linkText: {
      fontWeight: 500,
      fontSize: "1.1rem",
    },
    bold: {
      fontWeight: 500,
    },
    logo: {
      width: "200px",
      marginBottom: "20px",
    },
    headerDiv: {
      margin: "100px 0 100px 0",
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("md")]: {
        alignItems: "start",
      },
    },
    subHeaderTypo: {
      fontFamily: "Joan",
      fontSize: "20px",
    },
    staffDiv: {
      display: "grid",
      gridTemplateColumns: "1fr",
      ...rowGap(8),
      marginTop: "50px",
      [theme.breakpoints.up("md")]: {
        gridTemplateColumns: "1fr 1fr",
        marginTop: "100px",
      },
      [theme.breakpoints.up("lg")]: {
        gridTemplateColumns: "1fr 1fr 1fr",
        marginTop: "120px",
      },
    },
    wrapper: {
      margin: "0 30px 30px 30px",
    },
    frame: {
      listStyle: "none",
      listStyleType: "none",
      margin: "0px",
      textAlign: "center",
      display: "inline-block",
      padding: "15px 15px 10px 15px",
      borderWidth: "10px",
      borderStyle: "solid",
      borderColor: "#1F1E1E #292828 #292828 #272626",
      background: "#F5F5F5",
      [theme.breakpoints.up("smPlus")]: {
        borderWidth: "15px",
        padding: "30px 30px 25px 30px",
      },
      [theme.breakpoints.up("lg")]: {
        borderWidth: "15px",
        padding: "20px 20px 15px 20px",
      },
      [theme.breakpoints.up("lgPlus")]: {
        borderWidth: "15px",
        padding: "30px 30px 25px 30px",
      },
      backgroundImage: "linear-gradient(#FFFEF8, #F3F3F1)",
      filter: "drop-shadow(8px 8px 8px rgba(0, 0, 0, 0.4))",
      position: "relative",
      overflow: "hidden",
      "&:before": {
        content: '""',
        position: "absolute",
        top: "-175px",
        right: "-20%",
        width: "400px",
        height: "400px",
        transform: "rotateZ(-40deg)",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.4), rgba(255,255,255,0))",
      },
    },
    image: {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "#BBBAB4 #C7C7BF #E5E4DF #C7C7BF",
      boxShadow:
        "0 -1px 1px rgba(0,0,0,.1), 0 1px 1px 1px rgba(255,255,255,.7)",
      maxWidth: "100%",
      width: "100%",
      aspectRatio: "1/1",
      objectFit: "cover",
      backgroundColor: "#FAF3EE",
    },
    flex: {
      display: "flex",
      justifyContent: "center",
    },
    bottomDiv: {
      marginBottom: "40px",
      [theme.breakpoints.up("smPlus")]: {
        marginBottom: "80px",
      },
    },
    videoFrame: {
      width: "350px",
      height: "196.58px",
      [theme.breakpoints.up("sm")]: {
        width: "400px",
        height: "225px",
      },
      [theme.breakpoints.up("smPlus")]: {
        width: "500px",
        height: "281.25px",
      },
      [theme.breakpoints.up("md")]: {
        width: "600px",
        height: "337.5px",
      },
      [theme.breakpoints.up("mdPlus")]: {
        width: "800px",
        height: "449.33px",
      },
      [theme.breakpoints.up("lg")]: {
        width: "1000px",
        height: "561.67px",
      },
      [theme.breakpoints.up("lgPlus")]: {
        width: "1200px",
        height: "674px",
      },
    },
  })
);
