import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BorderBottomSharp } from "@material-ui/icons";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      [theme.breakpoints.up("smPlus")]: {
        flexDirection: "row",
        padding: "80px",
      },
    },

    fullContainer: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      [theme.breakpoints.up("smPlus")]: {
        flexDirection: "row",
        height: "auto",
      },
    },
    // container: {
    //   height: "100vh",
    //   [theme.breakpoints.up("smPlus")]: {
    //     height: "auto",
    //     borderRadius: "0px 10px 10px 0px",
    //   },
    // },
    top: {
      width: "100vw",
      height: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(/images/boostimage.png)`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      [theme.breakpoints.up("smPlus")]: {
        height: "100%",
        width: "40vw",
      },
    },
    rowDesktop: {
      display: "flex",
      flexDirection: "row",
    },

    imgText: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      borderRadius: "2px",
      width: "100%",
      [theme.breakpoints.up("smPlus")]: {
        width: "440px",
        height: "auto",
      },
    },
    textOne: {
      fontWeight: 600,
      fontSize: "22px",
      letterSpacing: "1px",
      marginTop: "0px",
      marginBottom: "10px",
      textAlign: "center",
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "30px",
      },
    },
    textTwo: {
      fontWeight: 600,
      fontSize: "18px",
      letterSpacing: "1px",
      marginTop: "20px",
      marginBottom: "20px",
      textAlign: "center",
      [theme.breakpoints.up("smPlus")]: {},
    },
    right: {
      backgroundColor: "#FFFFFF",
      width: "100vw",
      height: "50%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
      [theme.breakpoints.up("smPlus")]: {
        width: "50vw",
        height: "80vh",
        padding: "30px",

        marginTop: "0px",
      },
    },
    downMobile: {
      backgroundColor: "#A48BC1",
      width: "100vw",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      [theme.breakpoints.up("smPlus")]: {
        height: "40vh",
        width: "40vw",
      },
    },

    header: {
      marginBottom: theme.spacing(4),
      fontWeight: 600,
      fontSize: "30px",
    },
    content: {
      marginTop: theme.spacing(4),
      color: "white",
    },

    contentPointHeader: {
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      color: "white",
      letterSpacing: "1px",
      fontWeight: 400,
      fontSize: "28px",
      marginTop: "12px",
    },

    priceNow: {
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      color: "white",
      letterSpacing: "1px",
      fontWeight: 400,
      fontSize: "18px",
      marginBottom: "37px",
    },

    contentPoint: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 400,
      color: "white",
    },
    contentDiv: {
      display: "flex",
      alignItems: "center",
      fontWeight: 500,

      color: "white",
    },
    contentText: {
      textAlign: "center",
      color: "white",
      marginTop: "47px",
      marginBottom: "17px",
      fontSize: "16px",
      lineHeight: "19px",
      letterSpacing: "0px",
    },

    logo: {
      marginTop: "10px",
      width: "314px",
      marginBottom: "26px",
      alignSelf: "center",
      [theme.breakpoints.up("smPlus")]: {
        marginBottom: "40px",
      },
    },
    stripe: {
      width: "300px",
    },
    cardContentWidth: {
      width: "100%",
    },
  })
);