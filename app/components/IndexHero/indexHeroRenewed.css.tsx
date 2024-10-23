import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { columnGap, rowGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      gridColumn: "1/4",
      background: theme.palette.grey[200],
      // backgroundColor: "var(--background-color-darker)",
      overflow: "visible", // Ensure this is set to visible to not clip the scrollbar
      marginTop: "20px",
      height: "80vh",
      backgroundColor: "blue",
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        height: "70vh",
      },
    },

    fullWidthContainer: {
      width: "100vw",
      flexDirection: "column-reverse",
    },
    fullWidthImage: {
      position: "relative",
      width: "100vw",
      height: "50vh",
      minHeight: "400px",
      [theme.breakpoints.up("smPlus")]: {
        height: "calc(100vh - 90px)",
      },
      "& img": {
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 10,
      },
    },
    fullWidthImageTwo: {
      position: "relative",
      width: "100vw",
      height: "70vh",
      minHeight: "400px",
      [theme.breakpoints.up("sm")]: {
        height: "calc(100vh - 90px)",
      },
      "& img": {
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "inherit",
        zIndex: 10,
      },
    },

    headlineContainer: {
      position: "absolute",
      top: "20px",
      bottom: "20px",
      left: "20px",
      right: "20px",
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "center",
      alignItems: "center",
      // textAlign: 'center',
    },
    headlineContainerMobile: {
      position: "absolute",
      top: "20px",
      bottom: "20px",
      left: "20px",
      right: "20px",
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "space-around",
      alignItems: "center",
    },

    headlineContainerTwo: {
      position: "absolute",
      top: "0px",
      bottom: "0px",
      left: "0px",
      right: "0px",
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "space-around",
      alignItems: "center",
      [theme.breakpoints.up("sm")]: {
        alignItems: "flex-start",
      },
    },
    sectionWrapper: {
      display: "flex",
      flexDirection: "column",
      height: "80vh",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        flexDirection: "row",
        height: "70vh",
      },
    },

    imgWrapper: {
      backgroundColor: "white",
      width: "100vw",
      height: "50%",
      [theme.breakpoints.up("sm")]: {
        backgroundColor: "white",
        width: "50vw",
        height: "100%",
      },
    },

    headlineWrapper: {
      backgroundColor: "#ebebeb",
      height: "50%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "10px 10px 10px 10px",
      [theme.breakpoints.up("sm")]: {
        height: "100%",
        width: "50vw",
        padding: "0px",
        alignItems: "center",
        backgroundColor: "#ebebeb",
      },
    },
    headline: {
      position: "relative",
      fontWeight: 400,
      fontSize: "22px",
      color: "black",
      zIndex: 20,
      textAlign: "center",
      marginBottom: "10px",
      padding: "0px 0px 0px 0px",
      [theme.breakpoints.up("sm")]: {
        fontSize: "24px",
        color: "black",
        textAlign: "left",
        padding: "0px",
      },
      [theme.breakpoints.up("md")]: {},
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
      [theme.breakpoints.up("sm")]: {
        fontSize: "22px",
        color: "black",
        textAlign: "left",
        padding: "0px",
      },
      [theme.breakpoints.up("md")]: {},
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "28px",
        width: "80%",
      },
    },

    headlineTwo: {
      position: "relative",
      fontWeight: 400,
      fontSize: "20px",
      color: "#00000078",
      textAlign: "center",
      zIndex: 20,
      width: "100%",
      marginBottom: "40px",
      padding: "0px 0px 0px 0px",
      [theme.breakpoints.up("sm")]: {
        fontSize: "2.2rem",
        textAlign: "left",
        padding: "0px",
      },
      [theme.breakpoints.up("md")]: {},
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "1.4rem",
        width: "80%",
      },
    },
    headlineThree: {
      position: "relative",
      fontWeight: 400,
      fontSize: "16px",
      color: "#00000078",
      textAlign: "center",
      zIndex: 20,
      width: "100%",
      padding: "0px 0px 0px 0px",
      [theme.breakpoints.up("sm")]: {
        fontSize: "2.2rem",
        textAlign: "left",
        padding: "0px",
      },
      [theme.breakpoints.up("md")]: {},
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "1.4rem",
        width: "80%",
      },
    },
    buttonWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
      [theme.breakpoints.up("mdPlus")]: {
        justifyContent: "left",
        position: "relative",
        width: "80%",
        marginTop: "20px",
      },
    },

    buttonRegister: {
      border: "1px solid #99999987",
      borderRadius: "40px",
      marginRight: "10px",
      padding: "10px 10px 10px 10px",
      fontSize: "12px",
      fontWeight: 300,
      [theme.breakpoints.up("sm")]: {
        padding: "10px 20px 10px 20px",

        fontSize: "16px",
      },
      "&:hover": {
        backgroundColor: "#289528",
        color: "white",

        border: "none",
      },
    },
    buttonFindArt: {
      border: "1px solid #99999987",
      borderRadius: "40px",
      marginRight: "10px",
      padding: "10px 10px 10px 10px",
      fontSize: "12px",
      fontWeight: 300,
      [theme.breakpoints.up("sm")]: {
        padding: "10px 20px 10px 20px",
        fontSize: "16px",
      },
      "&:hover": {
        backgroundColor: "black",
        color: "white",
      },
    },

    desktopHeaderButtons: {
      display: "flex",
      marginTop: "20px",
      zIndex: 20,
      flexFlow: "row nowrap",
      // [theme.breakpoints.up("sm")]: {
      //   flexDirection: 'row',
      // },
      "& button": {
        minWidth: "150px",
        // margin: '0 10px',
      },
    },
    readMoreButton: {
      position: "absolute",
      bottom: "320px",
      left: "20px",
      zIndex: 20,
      color: "white",
      "&:hover": {
        "& button": {
          backgroundColor: "white",
        },
      },

      [theme.breakpoints.up("smPlus")]: {
        display: "inline",
        bottom: "20px",
        left: "20px",
      },
    },
    imageContainter: {
      [theme.breakpoints.up("sm")]: {
        width: "50%",
        height: "50%",
      },
      "& img": {
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 1,
      },
    },

    left: {
      // border: '1px solid red',
      textAlign: "left",
      flexBasis: "100%",
      flexGrow: 2,
      width: "90%",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      flexDirection: "column",
      // ...columnGap(theme.spacing(1)),
      marginRight: "16px",
      marginLeft: "16px",
      // marginTop: "12px",
      // margin: theme.spacing(0, 0, 4, 0),
      marginTop: 0,
      marginBottom: 0,
      placeItems: "center",

      [theme.breakpoints.up("smPlus")]: {
        // margin: theme.spacing(0, 0, 2, 0),
        // width: "567px",
        // marginTop: "2px",
      },
      [theme.breakpoints.up("md")]: {
        // textAlign: "initial",
        // margin: theme.spacing(0, 0, 4, 4),
        // placeItems: "center",
      },
      [theme.breakpoints.up("mdPlus")]: {
        // textAlign: "initial",
        // margin: theme.spacing(0, 0, 4, 4),
        // placeItems: "flex-start",
      },
    },

    accordion: {
      backgroundColor: "var(--header-color)",
      width: "100%",
    },
    accordionDiv: {
      display: "none",
      [theme.breakpoints.up("smPlus")]: {
        display: "flex",
        paddingRight: theme.spacing(0),
        margin: "0 0",
        marginLeft: "-15px",
      },
    },

    detailsText: {
      ...columnGap(theme.spacing(1)),
      margin: "20px 0",
      marginTop: "-20px",
      fontFamily: "Gotham !important",
      fontSizeAdjust: 0.5,
    },

    textDiv: {
      display: "flex",
      placeContent: "center",
      marginBottom: "20px",
    },
    buttonDiv: {
      justifyContent: "center",
    },
    button: {
      border: "none",
      marginTop: "-50px",
      [theme.breakpoints.up("smPlus")]: {
        marginTop: "-5px",
      },
    },
    buttonReview: {
      backgroundColor: "green",
      marginTop: "-50px",
      [theme.breakpoints.up("smPlus")]: {
        marginTop: "-5px",
      },
    },

    buttonDivReview: {
      display: "flex",
      justifyContent: "flex-start",
      marginTop: theme.spacing(2), // adjust as per your design needs
    },
    reviewDiv: {
      display: "flex",
      flexDirection: "column", // This sets the children to stack vertically
      alignItems: "start",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(5),

      [theme.breakpoints.up("smPlus")]: {
        marginBottom: theme.spacing(2),
      },
    },
    allReviews: {
      display: "flex",
      flexDirection: "column", // This sets the children to stack vertically
    },

    headingReview: {
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "32px",
      fontFamily: "Gotham !important",
      margin: "10px",
      [theme.breakpoints.down("sm")]: {
        fontWeight: 500,
        lineHeight: "18px",
        fontSize: "10px",
        margin: "5px",
      },
      [theme.breakpoints.down("smPlus")]: {
        fontSize: "14px",
        lineHeight: "18px",
        margin: "5px",
      },
    },
    firstReview: {
      fontWeight: 500,
      fontSize: "12px",
      lineHeight: "32px",
      fontFamily: "Gotham !important",
      margin: "0px",
      [theme.breakpoints.down("sm")]: {
        fontWeight: 400,
        lineHeight: "15px",
        fontSize: "12px",
        margin: "5px",
      },
      [theme.breakpoints.down("smPlus")]: {
        fontSize: "14px",
        lineHeight: "18px",
        margin: "5px",
      },
    },
    accDescription: {
      fontFamily: "Gotham !important",
      marginTop: "10px",
      marginBottom: "10px",
    },
    heading: {
      fontWeight: 600,
      lineHeight: "32px",
      fontFamily: "Gotham !important",
    },
    headlineCurated: {
      position: "relative",
      fontWeight: 400,
      fontSize: "1.2rem",
      textAlign: "center",
      color: "white",
      zIndex: 20,
      "& span": {
        display: "none",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "2.0rem",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "center",
      },
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "2.4rem",
        width: "70%",
      },
    },
    fullWidthImageCurated: {
      position: "relative",
      width: "100vw",
      height: "70vh",
      minHeight: "400px",
      [theme.breakpoints.up("sm")]: {
        height: "calc(100vh - 90px)",
      },
      "& img": {
        position: "relative", // Change to relative
        width: "100%", // Adjust width to ensure it takes the space correctly
        height: "100%", // Maintain aspect ratio
        objectFit: "cover",
        zIndex: 1, // Lower z-index to avoid overlap
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
        left: "85%", // Adjust to the left of the center (with proper offset)
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
          color: "#fadf87", // Active color
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
        backgroundColor: "#5555552b",
      },
    },
  })
);
