import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "#FDF9F7",
      width: "100vw",
      margin: "0 auto",
    },
    header: {
      backgroundColor: "#ffdd84c9",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "20px",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        backgroundColor: "#ffdd84c9",
        color: "white",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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

    favoriteTitle: {
      fontSize: "36px",
      fontWeight: "lighter",
      margin: "0px",
      color: "black",
      [theme.breakpoints.up("md")]: {
        fontSize: "66px",
        fontWeight: "lighter",
      },
    },
    favoriteText: {
      color: "#999999",
      [theme.breakpoints.up("md")]: {
        fontWeight: "lighter",
      },
    },

    artworksContainer: {
      marginTop: "40px",
      width: "80%",
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
      backgroundColor: "#fadf87",
      color: "black",
      width: "auto",
      "&:hover": {
        backgroundColor: "#fee19c",
        color: "black",
        boxShadow: "5px 5px 10px #e5e6e4",
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
