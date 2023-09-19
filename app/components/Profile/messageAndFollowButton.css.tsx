import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    btnWrapper: {
      display: "flex",
      justifyContent: "center",
      gap: "3vw",
      alignItems: "center",
      marginBottom: "1vh",
      [theme.breakpoints.up("md")]: {
        justifyContent: "normal",
        gap: "0.5vw",
        marginTop: "-10px",
      },
    },
    followButton: {
      maxHeight: "27px",
      backgroundColor: "white",
      color: "#3d3d4e",
      border: " 1px solid black",
      marginTop: "1.5vh",
      "& .MuiButton-startIcon": {
        margin: "0 0",
      },
    },
    messageButtonText: {
      display: "none",
    },
  })
);
