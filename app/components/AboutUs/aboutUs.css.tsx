import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { columnGap, rowGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: "-60px",
      [theme.breakpoints.up("md")]: {
        marginTop: "0",
      },
    },
    headerDiv: {
      margin: "100px 0 100px 0",
      fontFamily: "Joan",
      display: "flex",
      flexDirection: "column",

      [theme.breakpoints.up("md")]: {
        alignItems: "start",
      },
      [theme.breakpoints.up("lg")]: {},
    },
    headerTypo: {
      fontWeight: 600,
      marginBottom: "20px",
      fontFamily: "Roboto",
    },
    subHeaderTypo: {
      marginBottom: "30px",
      fontFamily: "Joan",
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
      "& :before": {
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
      // marginBottom: '10px'
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
    bold: {
      fontWeight: 500,
      marginTop: "5px",
    },
  })
);
