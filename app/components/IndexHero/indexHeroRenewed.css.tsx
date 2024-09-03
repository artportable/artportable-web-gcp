import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { columnGap, rowGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      gridColumn: "1/4",
      background: theme.palette.grey[200],
      backgroundColor: "var(--background-color-darker)",
      overflow: "visible", // Ensure this is set to visible to not clip the scrollbar
      marginTop: "20px",
    },

    fullWidthContainer: {
      width: "100vw",
      flexDirection: "column-reverse",
    },
    fullWidthImage: {
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
        objectFit: "cover",
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
      justifyContent: "space-around",
      alignItems: "center",
      // textAlign: 'center',
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
    headline: {
      position: "relative",

      fontWeight: 600,
      fontSize: "1.6rem",
      textAlign: "center",
      color: "white",
      zIndex: 20,
      "& span": {
        display: "none",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "2.2rem",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "center",
      },
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "3.0rem",
        width: "70%",
      },
    },
    headlineTwo: {
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
        fontSize: "2.2rem",
      },
      [theme.breakpoints.up("md")]: {
        textAlign: "center",
      },
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "1.4rem",
        width: "40%",
      },
    },
    desktopHeaderButtons: {
      display: "flex",
      // marginTop: '60px',
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
      bottom: "20px",
      right: "40px",
      zIndex: 20,
      "& button": {
        border: "none",
        backgroundColor: "rgba(255, 255, 255, .75)",
      },
      "&:hover": {
        "& button": {
          backgroundColor: "white",
        },
      },
      display: "none",
      [theme.breakpoints.up("smPlus")]: {
        display: "inline",
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

    "@global": {
      ".swiper-scrollbar": {
        position: "absolute", // Changed from static to absolute
      },
      ".swiper-scrollbar-drag": {},
    },
  })
);
