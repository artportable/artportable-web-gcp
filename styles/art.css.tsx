import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { rowGap, columnGap } from "../app/utils/styleUtils";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    backBtnContainer: {
      alignSelf: "flex-start",
    },
    flexContainer: {},

    overrides: {
      MuiExpansionPanel: {
        root: {
          "&:before": {
            display: "none",
          },
        },
      },
    },

    paper: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      maxWidth: "calc(100vw)",
      minHeight: "calc(50vh)",
      borderRadius: "5px",
      backgroundColor: "white",
      padding: "20px",
    },
    fullContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    imageContainer: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      maxWidth: "100%",
      alignItems: "center",
      margin: "10px",
    },

    primaryImage: {
      maxWidth: "100%",
      minWidth: "calc(50vw)",
      maxHeight: "calc(70vh)",
      objectFit: "contain",
      height: "auto",
      alignItems: "center",
      [theme.breakpoints.up("smPlus")]: {
        maxWidth: "100%",
        maxHeight: "calc(80vh)",
      },
    },

    infoAccordion: {
      background: "transparent",
      marginTop: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&::before": {
        display: "none",
      },
    },
    accordionSummary: {
      display: "flex",
      minWidth: "15%",
      alignItems: "center",

      "& .MuiAccordionSummary-content": {
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
      },
      "& .MuiTypography-body1": {
        margin: 0,
      },
      "& .MuiIconButton-root": {
        marginLeft: "auto", // Push the icon to the right edge
        padding: 0, // Remove any additional padding
      },
    },
    accordionDetails: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    artInfo: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      alignItems: "center",
      marginTop: "20px",
      marginBottom: "25px",

      [theme.breakpoints.up("md")]: {
        width: "100%",
      },
    },
    followButton: {
      maxHeight: "30px",
    },

    infoBar: {},
    infoContainer: {},
    titleAndSizeContainer: {
      display: "flex",
      flexDirection: "column",
      margin: theme.spacing(0, 0, 0, 0.4),
      padding: theme.spacing(0.75, 0, 0, 0),
    },

    artworkWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      },
    },

    artworkInfoWrapper: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "50%",
      },
    },
    title: {
      textAlign: "center",
      fontWeight: 400,
      letterSpacing: "2px",
      fontSize: "11px",
      fontStyle: "italic",
      width: "100%",
    },
    fullnameArtist: {
      fontSize: "14px",
      letterSpacing: "4px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    description: {
      fontStyle: "italic",
      textAlign: "center",
      fontWeight: 400,
      letterSpacing: "2px",
      fontSize: "12px",
    },
    tabs: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
    },

    tabPanel: {
      marginTop: "10px",
    },
    imgClass: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    nameSurname: { margin: "10px" },
    artistSection: {
      display: "flex",
      flexDirection: "column",
      padding: "0px 10px 10px 10px",
      alignItems: "center",
    },
    left: {
      display: "flex",
      justifyContent: "",
      width: "100%",
      [theme.breakpoints.up("md")]: {},
    },
    right: {
      marginTop: "20px",
      justifyContent: "flex-end",
      width: "100%",
      [theme.breakpoints.up("md")]: {
        justifyContent: "center",
        alignItems: "center",
      },
    },
    sizes: {
      fontWeight: 400,
      letterSpacing: "2px",
      fontSize: "12px",
    },
    narrowDescription: {
      maxWidth: "20%",
      whiteSpace: "pre-line",
      // Add any other styles you need for the narrow description
    },
    priceContainer: {
      margin: theme.spacing(0, 0, 0, 0.0),
      fontWeight: theme.typography.fontWeightMedium,
      paddingBottom: theme.spacing(0),
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
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
    flexLikeRoom: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    flexMessageLike: {
      display: "flex",
      alignItems: "center",
      alignSelf: "flex-end",
    },

    likeCounter: {
      marginLeft: "4px",
      marginRight: "0",

      fontWeight: 500,
      color: "#000000",
    },
    likeButton: {
      padding: theme.spacing(0.2, 0, 0.4, 0.5),
      fontSize: "0.5rem",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    chatButton: {
      padding: theme.spacing(0.5, 0, 0.4, 0.5),
      fontSize: "0.5rem",
      color: "#000000",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    shareButton: {
      padding: theme.spacing(0, 0.1, 0.2, 0.5),
      fontSize: "0.5rem",
      color: "#000000",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    text: {
      marginLeft: "0px",

      paddingBottom: "10px",
    },
    extraImages: {
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "space-around",
      alignItems: "center",
      "& :not(:first-child)": {
        marginLeft: theme.spacing(2),
      },
    },
    extraImage: {
      maxWidth: "calc(100vw - 32px)",
      maxHeight: "50vh",
      // width: '100%'
    },
    ownderText: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: "0px",
    },
    username: {
      fontWeight: 600,
      letterSpacing: "4px",
      fontSize: "13px",
      [theme.breakpoints.up("md")]: {
        fontWeight: 500,
        letterSpacing: "5px",
        fontSize: "14px",
      },
    },
    tagsContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: "30px",
    },
    chip: {
      marginRight: "5px",
    },
    soldMark: {
      background: "#C67777",
      borderRadius: "50%",
      width: "15px",
      height: "15px",
      marginRight: "5px",
    },
    roomDiv: {
      placeSelf: "flex-end",
      marginTop: "42px",
      [theme.breakpoints.up("smPlus")]: {
        marginTop: "20px",
      },
    },
    roomButton: {
      marginTop: "5px",
      fontWeight: theme.typography.fontWeightMedium,
      border: "1px solid black",
      color: "black",
    },
    flexPurchaseRoom: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
    [theme.breakpoints.up("smPlus")]: {
      titleAndSizeContainer: {
        flexDirection: "row",
      },
    },
  })
);
