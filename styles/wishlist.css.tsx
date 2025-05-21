import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import cover from "../public/images/wishlist-banner.png";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
  
      width: "100vw",
      margin: "0 auto",
      height: "auto",
    },
    header: {
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "20px",
      alignItems: "center",
      backgroundImage: `url(/images/ssbanner1.png)`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: "auto",
      [theme.breakpoints.up("md")]: {
        color: "white",
        height: "350px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
      },
    },
    sectionWrapper: {
      display: "flex",
      flexDirection: "column",

      margin: "10px",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: " space-between",
      },
    },

    fullnameArtist: {
      fontSize: "14px",
      letterSpacing: "4px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },

    nameSurname: { margin: "10px" },
    artistSection: {
      display: "flex",
      flexDirection: "column",
      padding: "0px 10px 10px 10px",
      alignItems: "center",
    },

    imgClass: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    titleText: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ffffff87",

      alignItems: "flex-start",
      width: "80%",
      borderRadius: "2px",
      padding: "20px",
      [theme.breakpoints.up("md")]: {
        width: "50%",
        backgroundColor: "white",
      },
    },
    favoriteTitle: {
      fontSize: "36px",
      fontWeight: "lighter",
      margin: "0px",
      color: "black",
      [theme.breakpoints.up("md")]: {
        color: "#313131",
        fontSize: "32px",
        fontWeight: "lighter",
      },
    },
    favoriteText: {
      color: "black",
      [theme.breakpoints.up("md")]: {
        fontWeight: "lighter",
        color: "#313131",
      },
    },

    artworksContainer: {
      marginTop: "40px",
      width: "80%",
      margin: "0 auto",
    },
    emptyStateContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "2rem",
      padding: "4rem 2rem",
      textAlign: "center",
      [theme.breakpoints.up("md")]: {
        padding: "6rem 2rem",
      },
    },
    emptyStateText: {
      color: theme.palette.text.secondary,
      maxWidth: "600px",
      margin: "0 auto",
    },
    sectionOne: {
      display: "flex",
      flexDirection: "column-reverse",

      [theme.breakpoints.up("md")]: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: " space-between",
        width: "50%",
      },
    },

    link: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      textDecoration: "none",
      color: "inherit",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        flexDirection: "column",
      },
    },
    sectionTwo: {
      display: "flex",
      flexDirection: "column-reverse",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: "20px",
      [theme.breakpoints.up("md")]: {
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: "0px",
      },
    },
    sectionTwoDiv: {
      marginLeft: "0px",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "10px",
      },
    },
    sectionTwoDivTwo: {
      marginLeft: "0px",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "10px",
      },
    },
    sectionThree: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
      marginTop: "20px",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "30%",
        marginTop: "0px",
      },
    },
    border: {
      borderBottom: "1px solid #ccc",
      margin: "30px",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    bookmarkIcon: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    bookmarkIconTop: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    linkTitle: {
      textDecoration: "none",
      fontSize: "20px",
      marginBottom: "0px",
      fontWeight: 400,
      width: "100%",
      "&:hover": {
        color: "blue",
      },
      [theme.breakpoints.up("md")]: {
        marginLeft: "10px",
      },
    },

    artistInfo: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "10px",
      [theme.breakpoints.up("md")]: {
        margin: "10px",
      },
    },

    price: {
      fontSize: "14px",
      paddingTop: "0px",
      marginTop: "0px",
      [theme.breakpoints.up("md")]: {
        marginLeft: "10px",
      },
    },
    purchaseRequestButton: {
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

      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "14px",
      },
    },

    priceContainer: {
      margin: theme.spacing(0, 0, 0, 0.0),
      fontWeight: "lighter",
      paddingBottom: theme.spacing(0),
      display: "flex",
      alignItems: "center",
      fontSize: "16px",
    },
  })
);
