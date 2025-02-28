import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { columnGap, rowGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
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
    footer: {
      fontFamily: "Joan",
      listStyle: "none",
      listStyleType: "none",
      margin: "0px",
      textAlign: "center",
      display: "flex",
      padding: "15px 15px 10px 15px",
      borderWidth: "10px",
      borderStyle: "solid",
      borderColor: "#1F1E1E #292828 #292828 #272626",
      background: "#F5F5F5",
      backgroundColor: "#ffdd84c9",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
      flexDirection: "column",
      flexWrap: "wrap",
      width: "100%",
      [theme.breakpoints.up("smPlus")]: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: "30px 30px 25px 30px",
      },
      [theme.breakpoints.up("md")]: {
        padding: "30px 30px 25px 30px",
      },
      [theme.breakpoints.up("lg")]: {
        padding: "30px 30px 25px 30px",
      },
      backgroundImage: "linear-gradient(#FFFEF8, #F3F3F1)",
      filter: "drop-shadow(8px 8px 8px rgba(0, 0, 0, 0.4))",
      position: "relative",
      overflow: "hidden",
    },
    image: {
      display: "flex",
      flexDirection: "column-reverse",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "#BBBAB4 #C7C7BF #E5E4DF #C7C7BF",
      boxShadow:
        "0 -1px 1px rgba(0,0,0,.1), 0 1px 1px 1px rgba(255,255,255,.7)",
      maxWidth: "100%",
      width: "100%",
      backgroundColor: "#FAF3EE",
      [theme.breakpoints.up("smPlus")]: {
        padding: "30px 30px 25px 30px",
        flexDirection: "row",
        alignItems: "flex-start",
      },
    },
    flexItem: {
      color: "black",
      "& .MuiTypography-root": {
        marginBottom: "3px",
      },
      [theme.breakpoints.up("smPlus")]: {
        padding: theme.spacing(2, 1),
      },
    },
    flexSocialMedia: {
      display: "flex",
      ...rowGap(10),
      marginTop: theme.spacing(1),
    },
    links: {
      // display: 'flex',
      // flexWrap: 'wrap',
      // gap: theme.spacing(2),
      color: "black",
      marginTop: theme.spacing(2),
      fontFamily: "Roboto",
    },
    reserved: {
      fontFamily: "Joan",
      color: "#999999",
    },
    cookies: {
      color: "black",
      fontFamily: "Joan",
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up("smPlus")]: {
        marginBottom: "0",
      },
    },
    logo: {
      width: "180px",
      alignSelf: "flex-start",
    },
    sunneby: {
      fontFamily: "Robot",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: theme.spacing(2),
      [theme.breakpoints.up("smPlus")]: {
        marginTop: "0",
      },
    },
    about: {
      color: "var(--ion-color-dark-contrast)",
    },
    idpLink: {
      cursor: "pointer",
    },
    tiktok: {
      width: "38px",
    },
    mobile: {
      // display: 'none',
      [theme.breakpoints.up("smPlus")]: {
        display: "initial",
      },
    },
    socialMediaFlex: {
      display: "flex",
      flexDirection: "row",
      ...rowGap(5),
      [theme.breakpoints.up("smPlus")]: {
        display: "none",
      },
    },
    socialmediaImage: {
      width: "30px",
      [theme.breakpoints.up("smPlus")]: {
        width: "initial",
      },
    },
    hereWeAreLink: {
      // marginTop: '0',
      [theme.breakpoints.up("smPlus")]: {
        marginTop: theme.spacing(2),
      },
    },
    getInTouch: {
      // marginBottom: theme.spacing(2),
      [theme.breakpoints.up("smPlus")]: {
        marginBottom: "initial",
      },
    },
    becomeAPart: {
      // display: 'none',
      [theme.breakpoints.up("md")]: {
        display: "initial",
      },
    },
    hide: {
      [theme.breakpoints.up("smPlus")]: {
        display: "none",
      },
      [theme.breakpoints.up("md")]: {
        display: "initial",
      },
    },
    hide2: {
      [theme.breakpoints.up("smPlus")]: {
        display: "none",
      },
      [theme.breakpoints.up("mdPlus")]: {
        display: "initial",
      },
    },
  })
);
