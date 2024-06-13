import { red } from "@material-ui/core/colors";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    rocketOverlay: {
      width: "100%",
      height: "100%",
      display: "flex",
      "&:hover": {
        "& .displayOnHover": {
          opacity: 1,
        },
      },
    },
    rocketIcon: {
      position: "absolute",
      top: "20px",
      left: "20px",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      "& img": {
        position: "absolute",
        top: "9px",
        left: "9px",
        width: "30px",
        height: "auto",
      },
    },
    overlayInfo: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "white",
    },
    writerContainer: {
      position: "absolute",
      top: -50,
      left: 0,
      width: "100%",
      height: 60,
      display: "flex",
      padding: "0px",
      alignItems: " center",
      textTransform: "uppercase",
      fontSize: "8px",
      letterSpacing: "6px",
      "& h2": {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      },
    },
    avatar: {
      height: "30px",
      width: "30px",
      marginRight: "10px",
    },
    storyFooter: {
      position: "absolute",
      top: "100%",
      left: 0,
      height: 75,
      width: "100%",
      padding: "0 0% 0%",
    },
    title: {
      textAlign: "start",
      paddingTop: "20px",
      margin: "0px 0 0 0",
      fontSize: "16px",
      wordWrap: "break-word",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      lineClamp: 2,
      "-webkit-box-orient": "vertical",
    },
    dateStart: {
      display: "inline-block",
      position: "absolute",
      top: -6,
      padding: "10px",
      width: "60px",
      height: "60px",
      boxSizing: "border-box",
      borderRadius: "999px",
      textAlign: "center",
      backgroundColor: "#000000",
      left: "50%",
      transform: "translate(-50%, -50%)",

      fontSize: "12px",
      textTransform: "uppercase",
      textDecoration: "none",
      fontWeight: 700,
    },
    monthDay: {
      display: "inline-block",
      textAlign: "center",
    },
    month: {
      color: "#fefefe",
      fontSize: "12px",
    },
    day: {
      color: "#fefefe",
      fontSize: "18px",
      display: "block",
    },
  })
);
