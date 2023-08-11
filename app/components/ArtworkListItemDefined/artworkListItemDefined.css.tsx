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
      "&:hover $chatButton": {
        visibility: "visible",
        opacity: 1,
      },
      "&:hover $shareButton": {
        visibility: "visible",
        opacity: 1,
      },
      "&:hover $title": {
        visibility: "hidden",
        opacity: 1,
      },
      "&:hover $tagsContainer": {
        visibility: "visible",
        opacity: 1,
      },
      "&:hover $purchaseRequestButtonSv": {
        backgroundColor: "#FF9191",
        border: "1px solid #FF9191",
      },
      "&:hover $purchaseRequestButtonEn": {
        backgroundColor: "#FF9191",
        border: "1px solid #FF9191",
      },
    },
    imageContainer: {
      borderRadius: "2px",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
      "& > div": {
        visibility: "hidden",
        opacity: 0,
        transition: "opacity 0.3s linear",
      },

      "&:hover > div": {
        visibility: "visible",
        opacity: 1,
      },
    },
    editOverlay: {
      position: "absolute",
      top: 0,
      visibility: "hidden",
      "@media (hover: none)": {
        visibility: "visible",
      },
      width: "100%",
      boxShadow: `${theme.palette.common.black} 0px 0px 40px 25px`,
    },

    topActions: {
      position: "absolute",
      top: 0,
      right: 0,
      padding: theme.spacing(1),
    },

    bottomActionsContainer: {
      background: "white",
      visibility: "hidden",
    },

    bottomActions: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      background: "#fdf9f7", // semi-transparent background
      borderRadius: "1px",
      padding: "5px", // adjust as necessary
      color: "black", // text color, adjust as necessary
      filter: "drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.4))",
    },
    iconInfoContainer: {
      display: "flex",
    },
    titleAndLike: {
      display: "flex",
      marginTop: theme.spacing(0.4),
      justifyContent: "space-between",
      alignItems: "flex-start",
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
    info: {
      flexGrow: 1,
      width: 0,
      padding: theme.spacing(0.4, 0, 0, 0),
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
    name: {
      fontSize: "0.95rem",
      fontWeight: 400,
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
    size: {
      fontSize: "0.8rem",
      lineHeight: "1rem",
      fontWeight: theme.typography.fontWeightRegular,
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
      color: "#FFA7A4",
      padding: theme.spacing(0.2, 0, 0.4, 0.5),
      fontSize: "0.5rem",
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
      color: "#C67777",
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
      color: "#000000",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    shareImg: {
      width: "24px",
      height: "24px",
    },
    purchaseRequestButtonSv: {
      minWidth: "100px",
      maxWidth: "100px",
      maxHeight: "28px",
      minHeight: "28px",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 2, 0, 2),
      margin: "1px 1px 1px 1px",
      border: "1px solid #c67777",
      backgroundColor: "#c67777",
      color: "white",
      filter: "drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.4))",
      fontSize: "12px",

      fontFamily: "gotham",
      "&:hover": {
        border: "1px solid #FF9191",
        backgroundColor: "#FF9191",
      },
    },
    infoContainer: {
      maxHeight: "100px",
      minHeight: "100px",
    },

    purchaseRequestButtonEn: {
      minWidth: "100px",
      maxWidth: "100px",
      maxHeight: "28px",
      minHeight: "28px",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 2, 0, 2),
      margin: "1px 1px 1px 1px",
      border: "1px solid #c67777",
      backgroundColor: "#c67777",
      color: "white",
      filter: "drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.4))",
      fontSize: "12px",

      fontFamily: "gotham",
      "&:hover": {
        border: "1px solid #FF9191",
        backgroundColor: "#FF9191",
      },
    },
    inLine: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginTop: "20px",
      position: "relative",
    },

    roomButtonSv: {
      minWidth: "50px",
      maxWidth: "50px",
      maxHeight: "28px",
      minHeight: "28px",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 2, 0, 2),
      margin: "1px 1px 1px 1px",
      border: "1px solid #c67777",
      backgroundColor: "transparent",
      color: "#FF9191",

      fontSize: "10px",

      fontFamily: "gotham",
      "&:hover": {
        border: "1px solid #FF9191",
        color: "white",
        backgroundColor: "#FF9191",
      },
    },
    titleTagsContainer: {
      position: "relative",
      maxHeight: "100%",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: "100%",
      overFlow: "hidden",
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

    smallTag: {
      backgroundColor: "transparent",
      border: "1px solid #c67777",
      margin: "2px",
      fontSize: "10px",
      paddingLeft: "3px",
      paddingRight: "3px",
      borderRadius: "20px",
      color: "#c67777",

      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: "100%",
      overFlow: "hidden",
    },

    roomButtonEn: {
      minWidth: "50px",
      maxWidth: "50px",
      maxHeight: "28px",
      minHeight: "28px",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 2, 0, 2),
      margin: "1px 1px 1px 1px",
      border: "1px solid #c67777",
      backgroundColor: "transparent",
      color: "#FF9191",
      fontSize: "10px",
      fontFamily: "gotham",
      "&:hover": {
        border: "1px solid #FF9191",
        color: "white",
        backgroundColor: "#FF9191",
      },
    },

    deleteGrid: {
      position: "relative",
    },
    deleteButton: {
      margin: theme.spacing(0.5),
      padding: 0,
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1),
    },
    purchaseFrameTool: {
      display: "flex",
      justifyContent: "space-between",
    },
    rum: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "5px",
    },
  })
);
