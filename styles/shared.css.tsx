import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    smallButton: {
      minWidth: "100px",
      height: "28px",
      minHeight: "28px",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 2, 0, 2),
      margin: "1px 1px 1px 1px",
      color: "#3d3d4e",
      fontSize: "12px",
      fontWeight: "normal",
      fontFamily: "gotham",
      borderRadius: "14px",
      "&:hover": {
        color: "black",
      },
    },
    largeButton: {
      minWidth: "100px",
      height: "36px",
      minHeight: "36px",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 3, 0, 3),
      color: "#3d3d4e",
      fontSize: "0.9rem",
      borderRadius: "18px",
      [theme.breakpoints.up("sm")]: {
        fontSize: "initial",
      },
      "&:hover": {
        color: "black",
      },
    },
    hugeButton: {
      minWidth: "100px",
      height: "40px",
      minHeight: "40px",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 4, 0, 4),
      color: "#3d3d4e",
      fontSize: "1.1rem",
      borderRadius: "30px",
      [theme.breakpoints.up("sm")]: {
        height: "60px",
        fontSize: "1.6rem",
      },
      "&:hover": {
        color: "black",
      },
    },
    buttonShadow: {
      filter: "drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.4))",
    },
    yellowButton: {
      border: "1px solid #3d3d4e",
      backgroundColor: "#FDF9F7",
      "&:hover": {
        backgroundColor: "#F7E2A8",
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
      border: "none",
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
