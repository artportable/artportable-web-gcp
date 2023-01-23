import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    newsletterContainer: {
      maxHeight: "900px",
      height: "100%",
      maxWidth: "400px",
      width: "100%",
    },

    newsletterImg: {
      padding: "20px",
      width: "100%",
    },

    newsletterHeader: {
      fontWeight: 600,
      fontSize: "24px",
      color: "#000000",
      fontFamily: "Gotham",
      marginTop: 0,
      marginBottom: 0,
      padding: "4px 20px",
    },

    newsletterText: {
      fontSize: "16px",
      fontWeight: 400,
      color: "#000000",
      marginTop: 0,
      padding: "10px 20px",
    },

    newsletterTextBottom: {
      padding: "20px",
      fontSize: "14px",
      fontWeight: 400,
    },

    newsletterActions: {
      display: "flex",
      justifyContent: "space-between",
      marginLeft: "20px",
      marginRight: "20px",
      marginTop: "10px",
    },

    newsletterButton: {
      backgroundColor: "#000000",
      color: "#FFFFFF",
      maxWidth: "140px",
      width: "100%",
    },

    newsletterTextField: {
      maxHeight: "80px",
      height: "100%",
      marginLeft: "20px",
      marginRight: "20px",
      width: "100%",
      maxWidth: "285px",
      padding: "8px",
    },

    newsletterLabel: {
      paddingLeft: "20px",
      fontWeight: 350,
    },

    [theme.breakpoints.up("smPlus")]: {
      newsletterContainer: {
        maxHeight: "1100px",
        height: "100%",
        maxWidth: "900px",
        width: "100%",
      },

      newsletterImg: {
        padding: "60px",
        paddingBottom: "40px",
      },

      newsletterHeader: {
        paddingLeft: "60px",
        paddingRight: "60px",
        fontSize: "32px",
      },

      newsletterText: {
        paddingLeft: "60px",
        paddingRight: "60px",
        marginBottom: "10px",
        fontWeight: 450,
      },

      newsletterLabel: {
        paddingLeft: "60px",
        fontSize: "18px",
      },

      newsletterTextField: {
        marginLeft: "60px",
        padding: "12px",
        maxHeight: "52px",
        height: "100%",
        width: "100%",
        maxWidth: "478px",
        fontSize: "18px",
      },

      newsletterActions: {
        height: "50px",
        marginLeft: "60px",
        marginRight: "60px",
        marginTop: "10px",
      },

      newsletterButton: {
        maxWidth: "230px",
        width: "100%",
        fontSize: "20px",
      },

      newsletterTextBottom: {
        paddingLeft: "60px",
        paddingRight: "60px",
      },
    },

    [theme.breakpoints.up("md")]: {
      newsletterContainer: {
        maxWidth: "100%",
      },

      imageBox: {
        maxWidth: "618px",
        width: "100%",
      },

      newsletterImg: {
        padding: "60px",
      },
    },
  })
);
