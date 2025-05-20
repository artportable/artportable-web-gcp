import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { columnGap } from "../app/utils/styleUtils";

export const styles = makeStyles((theme: Theme) => {
  return createStyles({
    containerHeader: {
      backgroundColor: "#222222",
      height: "320px",
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        height: "320px",
      },
    },

    containerWrapper: {},

    titleHeader: {
      fontSize: "35px",
      fontFamily: "Roboto",
      fontWeight: 500,
      alignItems: "center",
      color: "white",
      [theme.breakpoints.up("mdPlus")]: {
        marginLeft: "50px",
        fontSize: "35px",
        color: "white",
      },
    },

    textHeader: {
      fontSize: "14px",
      fontFamily: "Joan",
      color: "white",
      [theme.breakpoints.up("md")]: {
        marginLeft: "50px",
        fontSize: "14px",
      },
    },

    containerCard: {
      width: "90vw",
      margin: "0 auto",
      marginTop: "30px",
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "20px",

      [theme.breakpoints.up("md")]: {
        gridTemplateColumns: "repeat(3, 1fr)",
      },
    },

    wrapperCard: {
      borderRadius: "2px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "330px",
      height: "430px", // You can tweak this as needed
      backgroundColor: "white",
      margin: "0 auto",
      marginTop: "10px",
      boxShadow: "10px 0px 10px rgba(0, 0, 0, 0.20)",
    },
    statusText: {
      fontSize: "14px",
      fontWeight: 500,
      textAlign: "center",
      marginTop: "20px",
      minHeight: "20px", // Ensures all cards start at the same vertical point
    },

    artists: {
      fontWeight: 300,
      textAlign: "center",
      marginTop: "10px",
    },

    artistName: {
      textDecoration: "underline",
      textDecorationColor: "black",
      fontSize: "14px",
      "&:hover": {
        textDecorationColor: "rgb(167, 3, 1)",
        textDecorationThickness: "2px",
      },
    },

    adress: {
      fontSize: "12px",
      fontStyle: "italic",
      fontWeight: 200,
      textAlign: "center",
      marginTop: "auto",
    },
    image: {
      marginTop: "30px",
      width: "130px",
      height: "auto",
      objectFit: "contain",
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexGrow: 1,
      width: "100%",
      padding: "20px",
    },

    pageWrapper: {
      width: "95vw",
      backgroundColor: "white",
      margin: "0 auto",
      marginTop: "20px",
      padding: "20px",
    },
    layoutWrapper: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "0px",
    },
    mainImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",

      [theme.breakpoints.up("mdPlus")]: {
        height: "500px",
        marginBottom: "30px",
      },
    },

    leftCol: {
      flex: "2 1 600px",
      minWidth: "300px",
    },
    rightCol: {
      flex: "1 1 300px",
      minWidth: "250px",
    },
    title: {
      fontSize: "40px",
      fontWeight: 500,
      marginBottom: "0",
    },
    address: {
      fontSize: "14px",
      fontStyle: "italic",
      color: "#555",
      marginTop: "0",
      marginBottom: "40px",
    },
    description: {
      fontSize: "16px",
      fontWeight: 300,
      marginBottom: "30px",

      [theme.breakpoints.up("mdPlus")]: {
        maxWidth: "70%",
      },
    },
    contact: {
      fontSize: "15px",
    },
    galleryTitle: {
      fontSize: "16px",
      marginBottom: "15px",
    },
    galleryGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },

    galleryTopImage: {
      width: "100%",
      aspectRatio: "2 / 1", // Optional: makes it more horizontal
      objectFit: "cover",
      borderRadius: "4px",
      height: "250px",
    },

    galleryBottomRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px",
    },

    galleryImage: {
      width: "100%",
      aspectRatio: "1 / 1",
      objectFit: "cover",
      borderRadius: "4px",
    },

    footerContainer: {
      marginTop: "30px",
      backgroundColor: "#FABDCA",
      width: "100%",
      height: "380px",
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("lg")]: {
        height: "320px",
        flexDirection: "row",
        marginTop: "70px",
      },
    },

    footerBanner: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        height: "340px",
        marginLeft: "160px",
      },
    },
    footerWrapper: {
      display: "flex",
      alignItems: "center",
      margin: "0 auto",
      [theme.breakpoints.up("md")]: {},
    },
    bannerSquare: {
      backgroundColor: "#E00070",
      width: "120px",
      height: "120px",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      marginLeft: "40px",
      [theme.breakpoints.up("md")]: {
        height: "220px",
        width: "260px",
        marginLeft: "120px",
      },
    },
    bannerContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "#fff",
      marginTop: "40px",
      [theme.breakpoints.up("md")]: {
        marginLeft: "95px",
        marginTop: "0px",
      },
    },

    aaf: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "white",
      padding: "16px",
      lineHeight: "1.1rem",
      [theme.breakpoints.up("md")]: {
        fontSize: "46px",
        lineHeight: "2.1rem",
      },
    },
    bannerPreTitle: {
      fontSize: "14px",
      textTransform: "uppercase",
      marginBottom: "8px",
    },
    bannerDate: {
      fontSize: "22px",
      fontWeight: 500,
      marginBottom: "4px",
      [theme.breakpoints.up("md")]: {
        fontSize: "42px",
      },
    },
    bannerAddress: {
      fontSize: "12px",
      fontStyle: "italic",
      fontWeight: 200,
      marginBottom: "16px",
    },
    bannerArtistsLabel: {
      fontSize: "16px",
      marginBottom: "8px",
    },
    bannerArtists: {
      fontSize: "14px",
      fontWeight: 300,
    },
  });
});
