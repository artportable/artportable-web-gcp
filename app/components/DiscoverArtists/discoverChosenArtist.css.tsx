import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { columnGap, rowGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "auto",
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      justifyContent: "space-evenly",
      justifyItems: "center",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        gridTemplateColumns: "repeat(4, 1fr)",
      },
    },
    items: {
      width: "150px",
      height: "200px",
      [theme.breakpoints.up("md")]: {
        width: "250px",
        height: "250px",
        margin: "20px",
      },
    },
    headerDiv: {
      margin: "100px 0 100px 0",
      [theme.breakpoints.up("md")]: {
        width: "70vw",
      },
      [theme.breakpoints.up("lg")]: {
        width: "50vw",
      },
    },
    headerTypo: {
      fontWeight: 600,
      marginBottom: "20px",
    },
    subHeaderTypo: {
      marginBottom: "30px",
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
