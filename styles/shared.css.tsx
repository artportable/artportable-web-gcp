import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    smallButton: {
      borderRadius: "30px",
      fontWeight: 500,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "white",
      border: "1px solid black",
      color: "black",
      width: "150px",
      height: "30px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      marginTop: "30px",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "12px",
      },
    },
    largeButton: {
      borderRadius: "30px",
      fontWeight: 500,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "white",
      border: "1px solid black",
      color: "black",
      width: "150px",
      height: "30px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      marginTop: "30px",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "14px",
      },
    },
    hugeButton: {
      borderRadius: "30px",
      fontWeight: 500,
      fontFamily: "Roboto",
      fontSize: "12px",
      backgroundColor: "white",
      border: "1px solid black",
      color: "black",
      width: "150px",
      height: "30px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",
      marginTop: "30px",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "12px",
      },
    },
    buttonShadow: {
      filter: "drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.4))",
    },
    yellowButton: {
      border: "1px solid black",
      backgroundColor: "#FDF9F7",
      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
      },
    },
    findArtButton: {
      color: "white",
      [theme.breakpoints.up("sm")]: {
        height: "60px",
        fontSize: "1.6rem",
      },
      "&:hover": {},
    },
    largeButtonFindArt: {
      border: "1px solid black",
      minWidth: "100px",
      height: "50px",
      minHeight: "36px",
      whiteSpace: "nowrap",
      padding: theme.spacing(2, 2, 2, 2),
      fontSize: "0.9rem",
      borderRadius: "18px",
      color: "white",
      [theme.breakpoints.up("smPlus")]: {
        color: "white",
      },
      "&:hover": {
        backgroundColor: "#00000036",
      },
    },
    alwaysYellowButton: {
      border: "1px solid #3d3d4e",
      backgroundColor: "#F7E2A8",
      "&:hover": {
        backgroundColor: "#FEDD65",
      },
    },
    greenButton: {
      border: "1px solid #3d3d4e",
      backgroundColor: "#FDF9F7",
      "&:hover": {
        backgroundColor: "#6AC6A8",
      },
    },
    blackButton: {
      border: "1px solid black",
      color: "white",
      backgroundColor: "black",
      "&:hover": {
        color: "black",
        backgroundColor: "white",
      },
    },
    whiteButton: {
      border: "1px solid black",
      color: "black",
      backgroundColor: "white",
      "&:hover": {
        color: "white",
        backgroundColor: "black",
      },
    },
    colorAnimatedButton: {
      minHeight: "40px",
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: 1,
      // letterSpacing: '-0.2px',
      border: "none",
      borderRadius: "100px",
      color: "black",
      backgroundColor: "#F2D9D6",
      "&:hover": {
        color: "black",
        backgroundColor: "#EFC4B7",
      },
    },
    noBorder: {
      border: "1px solid black",
    },
    mediumThickness: {
      fontWeight: 500,
    },
    // wrapTextButton: {
    //   whiteSpace: 'pre-wrap',
    //   height: 'auto',
    // }
  })
);
