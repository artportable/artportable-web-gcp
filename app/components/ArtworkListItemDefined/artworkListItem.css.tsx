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
      '--image-padding': '15px',
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
    },

    // },
    infoRow: {
      position: 'absolute',
      left: 'var(--image-padding)',
      right: 'var(--image-padding)',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
    },
    topInfoRow: {
      top: 'var(--image-padding)',
    },
    bottomInfoRow: {
      bottom: 'var(--image-padding)',
      alignItems: 'flex-end',
    },
    topLeft: {
      flexBasis: 'calc(50% - var(--image-padding)))',
      textAlign: 'left',
      paddingBottom: '10px',
    },
    topRight: {
      flexBasis: 'calc(50% - var(--image-padding))',
      textAlign: 'right',
    },
    bottomLeft: {
      flexBasis: 'calc(50% - var(--image-padding))',
      textAlign: 'left',
      flexGrow: 1,
      maxWidth: '100%',
    },
    bottomRight: {
      flexBasis: 'calc(50% - var(--image-padding))',
      textAlign: 'right',
      flexGrow: 1,
      paddingTop: '10px',
    },
    fullWidthInfo: {
      flexBasis: 'calc(100% - 2 * (var(--image-padding)))',
    },
    requestButton: {
      position: 'relative',
    },
    likeInline: {
      display: "inline-block",
      float: "right",
      height: "12px",
    },
    likeContainer: {
      display: "flex",
      marginLeft: "10px",
      marginBottom: "5px",
      fontWeight: theme.typography.fontWeightRegular as number,
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette.text.secondary,
      placeItems: "center",
      justifyContent: 'flex-end',
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
      '& svg': {
        color: 'white',
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
      display: "flex",
      transition: "opacity 0.3s, visibility 0.3s",
      flexFlow: "row wrap",
      opacity: 0,
    },

    newUser: {
      display: 'inline-block',
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
      position: 'relative',
      marginBottom: '10px',
    },
    footerRow: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
    },
    name: {
      fontSize: "0.95rem",
      fontWeight: 400,
      textOverflow: "ellipsis",
      lineClamp: 2,
    },
    price: {
      fontSize: "0.8rem",
      lineHeight: "1rem",
      fontWeight: theme.typography.fontWeightMedium as number,
      display: "flex",
      // Padding top instead of align items center, looks better if artist name is multiple rows.
      paddingTop: '3px',
      paddingLeft: '20px',
      whiteSpace: 'nowrap',
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
