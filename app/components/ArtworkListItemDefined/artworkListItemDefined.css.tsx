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
      display: "inline-block",

      position: "relative",

      "&:hover $title": {
        visibility: "hidden",
        opacity: 1,
      },
      "&:hover $tagsContainer": {
        visibility: "visible",
        opacity: 1,
      },

      "&:hover $newUser": {
        visibility: "hidden",
        opacity: 0,
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
        "&:hover $desktopLikeTitle": {
          visibility: "visible",
          opacity: 1,
        },
      },
    },

    desktopLikeTitle: {
      display: "flex",
      zIndex: 10,
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        visibility: "hidden",
        opacity: 0,
        zIndex: 10,
        position: "absolute",
        transform: "(50%, 50%)",
        bottom: "10px",
        right: "10px",
      },
    },

    desktopEditButton: {},

    titleMobile: {
      fontSize: "16px",
      fontStyle: "italic",
      [theme.breakpoints.up("md")]: {
        visibility: "hidden",
        opacity: 0,
      },
    },

    likeMobile: {
      color: "black",
      fontSize: "14px",
      fontFamily: "Gotham",
      marginLeft: "4px",
    },

    imageContainer: {
      borderRadius: "2px",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
      [theme.breakpoints.up(960)]: {
        //"md" is broken
        "& > div:not($newUserWrapper)": {
          // Denna släcker hjärta och likes
          visibility: "hidden",
          opacity: 0,
          //transition: "opacity 0.3s linear",
        },
      },
      "& > $newUserWrapper $newUser": {
        visibility: "visible",
        opacity: 1,
      },
      "&:hover > div:not($newUserWrapper)": {
        display: "none",
        //visibility: "visible",
        //opacity: 1,
      },
      "&:hover $newUser": {
        visibility: "hidden",
        opacity: 0,
      },
      "&:hover $infoHover": {
        visibility: "hidden",
        opacity: 0,
      },
      [theme.breakpoints.up("md")]: {
        "&:hover $infoHover": {
          visibility: "visible",
          opacity: 1,
        },
      },
    },
    sortableImageContainer: {
      position: "relative",
      marginRight: "20px",
      marginBottom: "16px",
      cursor: "pointer",
      touchAction: "none",
      "&:hover $infoHover:not(.is-dragging)": {
        visibility: "visible",
        opacity: 1,
      },
    },
    sortIsSaving: {
      cursor: "default",
    },
    sortableImageContent: {
      position: "relative",
      height: "100%",
      width: "100%",
    },
    sortableImage: {
      height: "auto",
      width: "auto",
      maxHeight: "300px",
      maxWidth: "100%",
    },
    infoHover: {
      visibility: "hidden",
      opacity: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffffc2",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    infoWrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    titleHover: {
      color: "black",
      fontSize: "20px",
      fontStyle: "italic",
    },
    priceHover: {
      color: "black",
      fontSize: "16px",
    },
    tagsWrapper: {},

    titleAndLike: {
      display: "flex",
      marginTop: theme.spacing(0.4),
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexGrow: 2,
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.h6.fontSize,
      // placeItems: 'center'
    },
    nameTitleLike: {},
    likeInline: {
      display: "inline-block",
      float: "right",
      height: "12px",
    },
    likeContainer: {
      display: "flex",
      marginLeft: "10px",
      marginBottom: "5px",
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette.text.secondary,
      placeItems: "center",
    },
    newUserWrapper: {},
    newUser: {
      position: "absolute",
      visibility: "visible",
      opacity: 1,
      top: 10,
      right: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10px",
      backgroundColor: "rgb(0 0 0 / 57%)",
      borderRadius: "20px",
      fontWeight: "500",
      color: "white",
      flexShrink: 0,
      flexGrow: 0,
      padding: "10px 15px 10px 15px",
      boxShadow:
        "4px 2px 4px rgba(0, 0, 0, 0.5), 4px 2px 8px rgba(0, 0, 0, 0.5)",
    },

    info: {
      flexGrow: 2,
      width: 0,
      padding: theme.spacing(0.4, 0, 0, 0),
      whiteSpace: "nowrap",
      overflow: "hidden",
      flexWrap: "wrap",
      flexShrink: 1,
    },
    name: {
      fontSize: "0.95rem",
      fontWeight: 400,
      textOverflow: "ellipsis",
      lineClamp: 2,
    },
    title: {
      fontStyle: "italic",
      fontSize: "0.95rem",
      height: "1.3rem",
      marginBottom: "5px",

      [theme.breakpoints.down("sm")]: {
        visibility: "hidden",
        opacity: 0,
      },
    },

    sizesArt: {
      fontStyle: "normal",
      fontSize: "0.75rem",
      flexShrink: 0,
      flexGrow: 0,
    },

    price: {
      fontSize: "0.8rem",
      lineHeight: "1rem",
      fontWeight: theme.typography.fontWeightMedium,
      display: "flex",
    },

    soldMark: {
      background: "#C67777",
      borderRadius: "50%",
      width: "15px",
      height: "15px",
      marginRight: "5px",
      display: "flex",
    },
    likeCounter: {
      marginLeft: "4px",
      marginRight: "0",

      padding: theme.spacing(0.9, 0, 0, 0),
      fontWeight: 500,
      color: "#000000",
    },
    flexLikeCount: {
      display: "flex",
    },
    likeButton: {
      padding: theme.spacing(0.2, 0, 0.4, 0.5),
      fontSize: "0.5rem",
      color: "red !important",
      "&:hover": {
        backgroundColor: "transparent",
      },
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
    infoContainer: {
      maxHeight: "100px",
      minHeight: "100px",
    },
    inLine: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "5px",
      position: "relative",
    },

    titleTagsContainer: {
      position: "relative",
      maxWidth: "100%",
      flexGrow: 1,
      flexShrink: 0,
      textOverflow: "ellipsis",
      overflow: "hidden",
    },

    tagsContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      display: "flex",
      visibility: "hidden",
      opacity: 0,
      transition: "opacity 0.3s, visibility 0.3s",
      flexWrap: "wrap",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: "100%",
      overFlow: "hidden",
      [theme.breakpoints.down("sm")]: {
        visibility: "visible",
        opacity: 1,
      },
    },
    rum: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "5px",
    },
  })
);
