import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      gridColumn: "1/4",
      background: theme.palette.grey[200],
      // backgroundColor: "var(--background-color-darker)",
      overflow: "visible", // Ensure this is set to visible to not clip the scrollbar
      marginTop: "0px",
      height: "65vh",
      width: "95%",
      margin: "0 auto",
      [theme.breakpoints.up("smPlus")]: {
        height: "70vh",
        width: "100%",
        marginTop: "0px",
      },
      [theme.breakpoints.up("md")]: {
        height: "70vh",
        width: "100%",
        marginTop: "40px",
      },
    },

    sectionWrapper: {
      display: "flex",
      flexDirection: "column",
      height: "70vh",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        flexDirection: "row",
        height: "70vh",
      },
    },

    imgWrapper: {
      backgroundColor: "#ebebeb",
      width: "100vw",
      height: "50%",
      [theme.breakpoints.up("md")]: {
        backgroundColor: "#ebebeb",
        width: "50vw",
        height: "100%",
      },
    },

    headlineWrapper: {
      backgroundColor: "#FCF7EC",
      height: "50%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "10px 20px 10px 20px",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        height: "100%",
        width: "50vw",
        padding: "0px",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FCF7EC",
      },
    },

    imgWrapperRest: {
      backgroundColor: "white",
      width: "100vw",
      height: "50%",
      zIndex: 20,
      [theme.breakpoints.up("md")]: {
        backgroundColor: "white",
        width: "50vw",
        height: "100%",
      },
    },

    headlineWrapperRest: {
      backgroundColor: "#FCF7EC",
      height: "50%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "10px 20px 10px 20px",
      alignItems: "center",
      color: "black",
      [theme.breakpoints.up("md")]: {
        height: "100%",
        width: "50vw",
        padding: "0px",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    headline: {
      position: "relative",
      fontWeight: 400,
      fontFamily: "Roboto",
      fontSize: "20px",
      color: "black",
      zIndex: 20,
      textAlign: "center",
      marginBottom: "10px",
      padding: "0px 0px 0px 0px",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "35px",
        color: "black",
        textAlign: "center",
        padding: "0px",
        width: "80%",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "40px",
        color: "black",
        textAlign: "left",
        padding: "0px",
        width: "80%",
      },
      [theme.breakpoints.up("lgPlus")]: {
        fontSize: "40px",
      },
    },

    headlineStyled: {
      position: "relative",
      fontWeight: 400,
      fontSize: "22px",
      fontFamily: "Roboto",
      zIndex: 20,
      textAlign: "left",
      marginBottom: "10px",
      padding: "0px 0px 0px 0px",
      color: "black",
      [theme.breakpoints.up("md")]: {
        fontSize: "40px",
        color: "black",
        textAlign: "left",
        padding: "0px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "40px",
        width: "80%",
      },
    },
    headlineVernissage: {
      position: "relative",
      fontWeight: 400,
      fontSize: "20px",
      color: "black",
      zIndex: 20,
      textAlign: "left",
      marginBottom: "10px",
      padding: "0px 0px 0px 0px",
      [theme.breakpoints.up("md")]: {
        fontSize: "40px",
        color: "white",
        textAlign: "left",
        padding: "0px",
      },

      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "40px",
        width: "80%",
      },
    },
    headlineTitle: {
      position: "relative",
      fontWeight: 400,
      fontSize: "22px",
      color: "black",
      zIndex: 20,
      textAlign: "center",
      marginBottom: "10px",
      padding: "0px 0px 0px 0px",
      [theme.breakpoints.up("lg")]: {
        color: "black",
        textAlign: "left",
        padding: "0px",
        fontSize: "28px",
        width: "80%",
      },
    },

    mailUs: {
      fontSize: "12px",
      color: "black",
      marginTop: "6px",
    },
    imageTitle: {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      bottom: "0",
      left: "0",
      color: "white",
      marginLeft: "10px",
      fontSize: "8px",
      [theme.breakpoints.up("md")]: {
        fontSize: "14px",
      },
    },

    headlineTwo: {
      position: "relative",
      fontWeight: 400,
      fontSize: "11px",
      color: "#00000078",
      textAlign: "center",
      zIndex: 20,
      width: "100%",
      marginBottom: "30px",
      padding: "0px 0px 0px 0px",
      fontFamily: "Joan",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "26px",
        textAlign: "center",
        padding: "0px",
        width: "80%",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "20px",
        textAlign: "left",
        padding: "0px",
        width: "80%",
      },
    },
    headlineThree: {
      position: "relative",
      fontWeight: 400,
      fontSize: "12px",
      color: "#00000078",
      textAlign: "center",
      zIndex: 20,
      width: "100%",
      padding: "0px 0px 0px 0px",
      fontFamily: "Joan",
      [theme.breakpoints.up("md")]: {
        fontSize: "22px",
        textAlign: "left",
        padding: "0px",
        width: "80%",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "22px",
        textAlign: "left",
        padding: "0px",
        width: "80%",
      },
    },
    buttonWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
      [theme.breakpoints.up("lg")]: {
        justifyContent: "left",

        width: "80%",
        marginTop: "20px",
      },
    },
    buttonWrapperSeeMore: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
      [theme.breakpoints.up("lg")]: {
        justifyContent: "left",
        color: "black",
        width: "80%",
        marginTop: "20px",
      },
    },

    buttonRegister: {
      borderRadius: "40px",
      marginRight: "10px",
      padding: "10px 10px 10px 10px",
      fontSize: "10px",
      fontWeight: 600,
      fontFamily: "Roboto !important",
      backgroundColor: "#229059",
      color: "white",
      [theme.breakpoints.up("lg")]: {
        padding: "10px 20px 10px 20px",
        fontSize: "16px",
      },
      "&:hover": {
        backgroundColor: "#E2B651",
        textDecoration: "underline",
      },
    },
    buttonFindArt: {
      border: "1px solid #99999987",
      borderRadius: "40px",
      marginRight: "10px",
      padding: "10px 10px 10px 10px",
      fontSize: "12px",
      fontWeight: 300,
      [theme.breakpoints.up("lg")]: {
        padding: "10px 20px 10px 20px",
        fontSize: "16px",
      },
      "&:hover": {
        backgroundColor: "black",
        color: "white",
        border: "none",
      },
    },
    seeMoreButton: {
      borderRadius: "40px",
      marginRight: "10px",
      fontSize: "12px",
      fontFamily: "Roboto",
      fontWeight: 600,
      display: "flex",
      justifyContent: "left",
      color: "white",
      backgroundColor: "#0176D5",
      padding: "10px 20px 10px 20px",
      [theme.breakpoints.up("smPlus")]: {
        padding: "10px 20px 10px 20px",
        fontSize: "16px",
      },
      "&:hover": {
        backgroundColor: "#E2B651",
        textDecoration: "underline",
        color: "white",
      },
    },

    arrowDown: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "5px 20px 5px 20px",
      zIndex: 10,
    },

    "@global": {
      ".swiper-button-prev, .swiper-button-next": {
        position: "absolute",
        transition: "color 0.3s ease",
        color: "transparent",
        zIndex: 10,
      },

      ".swiper-button-prev": {
        left: "85%",
        height: "60vh",
        width: "6vw",
      },
      ".swiper-button-prev::after, .swiper-button-next::after": {
        fontSize: "3.0rem",
        fontWeight: "bold",
      },
      ".swiper-button-next": {
        left: "94%",
        width: "6vw",
        height: "60vh",
        padding: "8px 16px",
      },

      ".swiper-button-prev:not(.swiper-button-disabled), .swiper-button-next:not(.swiper-button-disabled)":
        {
          color: "#fadf87",
        },

      ".swiper-button-prev:hover, .swiper-button-next:hover": {
        color: "#fadf87",
        transform: "scale(1.1)",
      },
      ".swiper-button-prev:active, .swiper-button-next:active": {
        transform: "scale(0.95)",
      },

      ".swiper-scrollbar": {
        backgroundColor: "transparent",
      },

      ".swiper-scrollbar-drag": {
        backgroundColor: "#555555e8",
        height: "1px",
        [theme.breakpoints.up("lg")]: {
          display: "none",
        },
      },
    },
  })
);
