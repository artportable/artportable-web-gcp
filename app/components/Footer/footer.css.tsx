import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { columnGap, rowGap } from "../../utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      display: "flex",
      padding: theme.spacing(0, 2, 2, 2),
      background: theme.palette.grey[200],
      backgroundColor: "#ffdd84c9",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
      flexDirection: "column",
      flexWrap: "wrap",
      // position: 'fixed',
      // left: '0',
      // bottom: '0',
      width: "100%",
      [theme.breakpoints.up("smPlus")]: {
        flexDirection: "row",
        justifyContent: "space-around",
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(0, 8, 2, 8),
      },
      [theme.breakpoints.up("lg")]: {
        padding: theme.spacing(0, 0, 0, 0),
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
    },
    reserved: {
      color: "#999999",
    },
    cookies: {
      color: "black",
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
