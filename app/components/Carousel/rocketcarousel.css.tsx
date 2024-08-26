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
    likeButton: {
      position: "absolute",

      top: "5px",
      right: "10px",
      "& button": {
        padding: "0px",
        borderRadius: "50%",
        backgroundColor: "transparent",
      },
      "&:hover": {
        "& button": {
          backgroundColor: "transparent",
        },
      },
    },
    seeMoreButton: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      opacity: 0,
      transition: "opacity .25s ease-out",
      display: "none",
      // Hide on mobile or slide require double click on iphone before redirecting.
      [theme.breakpoints.up("md")]: {
        display: "inline",
      },
      // '&:hover': {
      //   opacity: 1,
      // }
    },
  })
);
