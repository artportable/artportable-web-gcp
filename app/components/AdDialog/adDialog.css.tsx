import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BorderColor } from "@material-ui/icons";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      "& .MuiDialog-paper": {
        maxWidth: "unset",
        overflowY: "unset",
        backgroundColor: "transparent",
        boxShadow: "none",
      },
      "& .MuiBackdrop-root": {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      },
    },
    closeButton: {
      zIndex: 9999,
      position: "absolute",
      right: "-10px",
      top: "-10px",
      color: "#000000",
      margin: "0 0 10px 10px",
      [theme.breakpoints.up("smPlus")]: {
        right: theme.spacing(0),
        top: theme.spacing(0),
      },
    },

    offerButton: {
      zIndex: 9999,
      position: "absolute",
      right: "20px",
      bottom: "0px",
      color: "#000000",
      margin: "0 0 10px 10px",
      fontSize: "9px",
      padding: "6px",
      backgroundColor: "#fadf87",
      borderRadius: "20px",
      [theme.breakpoints.up("smPlus")]: {
        right: "40px",
        bottom: "6px",
        padding: "10px",
        fontSize: "13px",
      },
      "&:hover": {
        backgroundColor: "#fce599",
      },
    },
    closeIcon: {
      fontSize: "1rem",
      [theme.breakpoints.up("mdPlus")]: {
        fontSize: "1.5rem",
      },
    },
    adImage: {
      maxWidth: "90vw",
      maxHeight: "90vh",
      [theme.breakpoints.up("md")]: {
        //   maxWidth: '90vw',
        // maxHeight: '90vh',
      },
    },
    videoFrame: {
      width: "300px",
      height: "168.75px",
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
    },
  })
);
