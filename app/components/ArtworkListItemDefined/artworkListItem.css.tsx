import { red } from "@material-ui/core/colors";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        smPlus: 820,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    container: {
      "--image-padding": "15px",
      display: "inline-block",
      position: "relative",
      "&:hover $tagsContainer": {
        visibility: "visible",
        opacity: 1,
      },
      "&:hover $newUser": {
        // visibility: "hidden",
        // opacity: 0,
      },
      [theme.breakpoints.up("md")]: {
        "&:hover $chatButton": {
          visibility: "visible",
          opacity: 1,
        },
        "&:hover $shareButton": {
          visibility: "visible",
          opacity: 1,
        },
      },
    },
    imageContainer: {
      borderRadius: "2px",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
      marginBottom: "10px",
    },

    // },
    infoRow: {
      position: "absolute",
      left: "var(--image-padding)",
      right: "var(--image-padding)",
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "space-between",
    },
    topInfoRow: {
      top: "var(--image-padding)",
      justifyContent: "flex-end",
    },
    bottomInfoRow: {
      bottom: "var(--image-padding)",
      alignItems: "flex-end",
    },
    topLeft: {
      // flexBasis: 'calc(50% - var(--image-padding))',
      textAlign: "left",
      paddingBottom: "10px",
    },
    topRight: {
      // flexBasis: 'calc(50% - var(--image-padding))',
      textAlign: "right",
    },
    bottomLeft: {
      flexBasis: "calc(50% - var(--image-padding))",
      textAlign: "left",
      flexGrow: 1,
      flexFlow: "row wrap-reverse !important", // Override value in tagsContainer.
      maxWidth: "100%",
    },
    bottomRight: {
      // flexBasis: 'calc(50% - var(--image-padding))',
      // flexGrow: 1,
      textAlign: "right",
      padding: "10px 0 0 10px",
    },
    fullWidthInfo: {
      flexBasis: "calc(100% - 2 * (var(--image-padding)))",
    },
    requestButton: {
      position: "relative",
    },
    likeInline: {
      display: "inline-block",
      float: "right",
      height: "12px",
    },
    likeContainer: {
      display: "flex",
      // marginLeft: "10px",
      marginBottom: "5px",
      fontWeight: theme.typography.fontWeightRegular as number,
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette.text.secondary,
      placeItems: "center",
      justifyContent: "space-between",
    },
    flexLikeCount: {
      display: "flex",
    },
    likeButton: {
      // padding: theme.spacing(0.2, 0, 0.4, 0.5),
      padding: "2px",
      fontSize: "0.5rem",
      borderRadius: "50%",

      color: "red !important",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#A70301",
      },
      "& svg": {
        color: "black",
        "&:hover": {
          backgroundColor: "transparent",
          color: "#A70301",
        },
      },
    },
    likeCounter: {
      marginLeft: "4px",
      marginRight: "0",
      padding: theme.spacing(0.9, 0, 0, 0),
      fontWeight: 500,
      color: "#000000",
    },
    chatButton: {
      visibility: "hidden",
      opacity: 0,
      transition: "opacity 0.4s linear, visibility 0.9s linear",
      padding: theme.spacing(0.5, 0, 0.4, 0.5),
      fontSize: "0.5rem",
      color: "016A70",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    shareButton: {
      visibility: "hidden",
      opacity: 0,
      transition: "opacity 0.4s linear, visibility 0.9s linear",
      padding: theme.spacing(0, 0.1, 0.2, 0.5),
      fontSize: "0.5rem",
      color: "016A70",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },

    tagsContainer: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        transition: "opacity 0.3s, visibility 0.3s",
        flexFlow: "row wrap",
        opacity: 0,
      },
    },

    newUser: {
      display: "inline-block",
      fontSize: "10px",
      backgroundColor: "rgb(0 0 0 / 57%)",
      borderRadius: "20px",
      fontWeight: 500,
      color: "white",
      flexShrink: 0,
      flexGrow: 0,
      padding: "10px 15px 10px 15px",
    },

    footer: {
      position: "relative",
      marginBottom: "5px",
    },
    footerRow: {},
    name: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: "0.95rem",
      fontWeight: 400,
      textOverflow: "ellipsis",
      lineClamp: 2,
      fontFamily: "Roboto",
      textTransform: "uppercase",
    },
    sizesArt: {
      fontSize: "0.75rem",
      flexShrink: 0,
      flexGrow: 0,
      fontWeight: 300,
    },
    price: {
      fontSize: "0.8rem",
      display: "flex",
      whiteSpace: "nowrap",
      fontFamily: "Roboto",
      fontWeight: 400,
      fontStyle: "italic",
      alignItems: "center",
    },
    soldMark: {
      background: "#C67777",
      borderRadius: "50%",
      width: "15px",
      height: "15px",
      marginRight: "5px",
      display: "flex",
    },
  })
);
