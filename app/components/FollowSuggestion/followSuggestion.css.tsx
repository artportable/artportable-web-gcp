import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: "transparent",
    },
    listItem: {
      paddingLeft: 0,
      paddingRight: 70,
    },
    listItemText: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      "& .MuiTypography-root": {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
    },
    secondaryAction: {
      right: "2px",
    },
    followButton: {
      borderRadius: "30px",
      fontWeight: 500,
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: "white",
      border: "1px solid black",
      color: "black",
      width: "auto",
      height: "20px",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      margin: "0 auto",

      "&:hover": {
        backgroundColor: "black",
        border: "1px solid black",
        color: "white",
      },
      [theme.breakpoints.up("smPlus")]: {
        fontSize: "12px",
      },
    },
  })
);
