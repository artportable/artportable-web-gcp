import { red } from "@material-ui/core/colors";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "inline-block",
    },
    imageContainer: {
      borderRadius: "2px",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
      "& img": {
        display: "block",
      },
      "&:hover > div": {
        visibility: "visible",
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
    titleAndLike: {
      display: "flex",
      marginTop: theme.spacing(0.4),
      justifyContent: "space-between",
      alignItems: "flex-start",
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.h6.fontSize,
      // placeItems: 'center'
    },
    likeInline: {
      display: "inline-block",
      float: "right",
      height: "30px",
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
      padding: theme.spacing(0.5, 0, 0.4, 0.5),
      fontSize: "0.5rem",
      color: "#C67777",
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
    shareImg: {
      width: "24px",
      height: "24px",
    },
    purchaseRequestButtonSv: {
      minWidth: "125px",
      maxWidth: "125px",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 2, 0, 2),
      border: "1px solid #FFA7A4",
      backgroundColor: "#FFA7A4",
      color: "white",
      filter: "drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.4))",
      fontSize: "12px",

      fontFamily: "gotham",
      "&:hover": {
        borderRadius: "10px",

        backgroundColor: "#FF9191",
        border: "0px 0px 0px 0px solid #FF9191",
      },
    },
    infoContainer: {
      backgroundColor: "#faf3ee",
      border: "1px solid #FFA7A4",
      borderTopColor: "transparent",
      margin: "3px 1px 1px 1px",
      padding: "3px 3px 3px 3px",
      borderRadius: "5px",
      maxHeight: "70px",
      minHeight: "70px",
    },

    purchaseRequestButtonEn: {
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 2, 0, 2),
      border: "1px solid #FFA7A4",
      backgroundColor: "#FFA7A4",
      color: "white",
      boxShadow: "1",
    },
    inLine: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0px 0px 0px 0px",
    },

    roomButtonSv: {
      marginTop: "5px",
      padding: theme.spacing(0, 0, 0, 0),
      fontWeight: theme.typography.fontWeightMedium,
      border: "1px solid black",
      color: "black",
      "&.MuiButton-root": {
        minWidth: "48px",
      },
    },
    roomButtonEn: {
      marginTop: "5px",
      padding: theme.spacing(0, 2, 0, 2),
      fontWeight: theme.typography.fontWeightMedium,
      border: "1px solid black",
      color: "black",
      "&.MuiButton-root": {
        minWidth: "48px",
        maxWidth: "58px",
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
    roomDiv: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
    },
  })
);
