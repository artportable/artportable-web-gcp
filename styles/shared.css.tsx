import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    smallButton: {
      minWidth: "100px",
      maxHeight: "28px",
      minHeight: "28px",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 2, 0, 2),
      margin: "1px 1px 1px 1px",
      color: "#3d3d4e",
      fontSize: "12px",
      fontWeight: "normal",
      fontFamily: "gotham",
      borderRadius: '20px',
      "&:hover": {
        color: "black",
      },
    },
    largeButton: {
      minWidth: "100px",
      maxHeight: "36px",
      minHeight: "36px",
      whiteSpace: "nowrap",
      padding: theme.spacing(0, 2, 0, 2),
      color: "#3d3d4e",
      fontSize: "0.9rem",
      [theme.breakpoints.up("sm")]: {
        fontSize: "initial",
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
    greenButton: {
      border: "1px solid #3d3d4e",
      backgroundColor: "#FDF9F7",
      "&:hover": {
        backgroundColor: "#6AC6A8",
      },
    }
  })
)